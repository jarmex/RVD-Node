import jwt from 'jsonwebtoken';
import { ApolloError } from 'apollo-server-express';
import { createHash } from 'crypto';
import { Logger } from '../../util';
import { restcommAccounts } from '../../RCModels'; // eslint-disable-line

const { printerror } = Logger('auth');

function createToken(sid, friendlyName) {
  const scret = process.env.USSD_CRYPTOHMAC || 'test323@@@£@324342sADqPEHADE';

  return jwt.sign(
    {
      id: sid,
      name: friendlyName,
    },
    scret,
    { expiresIn: '24hr' },
  );
}

const login = async (_, { username, password }, { res }) => {
  try {
    // check if email address was enter or sid id;
    const emailregex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let searchby = 'sid';
    if (emailregex.test(username)) {
      // email address
      searchby = 'emailAddress';
    }
    const accont = await restcommAccounts.findOne({
      where: {
        [searchby]: username,
      },
      raw: true,
    });
    if (!accont) {
      throw new ApolloError('Invalid Account');
    }
    const pwdhash = createHash('md5')
      .update(password)
      .digest('hex')
      .toLowerCase();
    if (accont.authToken && accont.authToken.toLowerCase() === pwdhash) {
      // password match
      const token = createToken(accont.sid, accont.friendlyName);
      accont.token = token;
      const expire = 1000 * 24 * 60 * 60 * 1; // 1 day
      res.cookie('token', token, { maxAge: expire, httpOnly: true });
      res.cookie('stoken', token, { maxAge: expire, secure: true });
      return accont;
    }
    throw new ApolloError('Invalid Account');
  } catch (error) {
    printerror(error.message);
    throw error;
  }
};

export default {
  Mutation: {
    login,
  },
};
