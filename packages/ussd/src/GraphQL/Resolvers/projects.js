import Redis from 'ioredis';
import fs from 'fs';
import { promisify } from 'util';
import { join } from 'path';
import { ApolloError } from 'apollo-server-express';
import { getLogger } from '../../util';
import { restcommApplications } from '../../RCModels'; // eslint-disable-line
import { ActivatedProjects } from '../../models'; // eslint-disable-line
import config from '../../config';

const { printinfo, debug, printerror } = getLogger().getContext('gql:pro');

// const cache = flatcache.load('rvdCache');
const cache = new Redis({ keyPrefix: 'paic:', ...config.redis });

const fstatAsync = promisify(fs.stat);
const fsreadAsync = promisify(fs.readFile);

const getprojects = async () => {
  // get the information from database and map it
  try {
    const retValue = [];
    const result = await restcommApplications.findAll({
      attributes: [
        'sid',
        'dateCreated',
        'dateUpdated',
        'friendlyName',
        'accountSid',
      ],
      where: {
        kind: 'ussd',
      },
      raw: true,
    });
    // check for assigned shortcode on the platform
    const platData = await ActivatedProjects.findAll({ raw: true });
    result.forEach((item) => {
      const isactived = platData.find((pd) => pd.sid === item.sid);
      if (isactived) {
        retValue.push(Object.assign({}, isactived, item));
      } else {
        retValue.push(item);
      }
    });
    return retValue;
  } catch (error) {
    printerror('ERROR: %s', error.message);
  }
  return null;
};

const activateProject = async (
  _,
  { sid, shortcode, friendlyName },
  { auth },
) => {
  if (!auth) {
    throw new ApolloError('Access denied');
  }
  // steps
  /*
  1. check if the shortcode is already in use
  2. check if the file exist?
  3. if it exist read the content and cache it
  4. save the information to database
  */
  try {
    const isdataExist = await ActivatedProjects.findOne({
      where: { shortcode },
    });
    if (isdataExist && isdataExist.sid !== sid) {
      throw new ApolloError('The short exist for another application');
    }
    const spath = join(process.env.RESTCOMM_WORKSPACE_DIR, sid, 'state');
    const stat = await fstatAsync(spath);
    debug(`file size is: ${stat.size}`);
    const filecontent = await fsreadAsync(spath, 'utf8');
    cache.set(shortcode, filecontent);
    const sidExist = await ActivatedProjects.findByPk(sid);
    if (sidExist) {
      // update
      sidExist.friendlyName = friendlyName;
      sidExist.shortcode = shortcode;
      await sidExist.save();
    } else {
      // generate the NodeId for the project
      const maxNumber = (await ActivatedProjects.max('NodeId')) || 0;

      await ActivatedProjects.create({
        sid,
        shortcode,
        friendlyName,
        NodeId: maxNumber + 1,
      });
    }
    return {
      result: true,
      message: 'Successfully loaded',
    };
  } catch (error) {
    printerror('ERROR: %s', error.message);
    return {
      result: false,
      message: error.message,
    };
  }
};

const deleteProject = async (_, { sid }) => {
  try {
    // check if the sid exist in the database
    const apro = await ActivatedProjects.findByPk(sid);
    if (!apro) {
      return {
        result: false,
        message: `The ${sid} does not exist in the current configuration. Try again`,
      };
    }
    await apro.destroy();
    // check from cache
    if (cache.get(apro.shortcode)) {
      cache.del(apro.shortcode);
    }
    return {
      result: true,
      message: `The ${sid} configuration has been removed. The RVD design still exist.`,
    };
  } catch (error) {
    printerror('ERROR: %s', error.message);
  }
  return {
    result: false,
    message: `An unknown error occurred for ${sid}. Try again`,
  };
};

/*
 * refresh a project and reload it to memory
 */
const refreshProject = async (_, { sid, shortcode }) => {
  printinfo(`Reloading ${sid} project......`);
  try {
    const spath = join(process.env.RESTCOMM_WORKSPACE_DIR, sid, 'state');
    const stat = await fstatAsync(spath);
    debug(`Reloading file of size: ${stat.size}`);
    const filecontent = await fsreadAsync(spath, 'utf8');
    cache.set(shortcode, filecontent);
    return {
      result: true,
      message: `Refresh for ${sid} was completed successfully`,
    };
  } catch (error) {
    printerror('ERROR: %s', error.message);
    return {
      result: false,
      message: 'Refresh failed',
    };
  }
};

export default {
  Query: { getprojects },
  Mutation: { activateProject, deleteProject, refreshProject },
};
