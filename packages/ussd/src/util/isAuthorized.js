import jwt from 'jsonwebtoken';

require('dotenv').config();

const scret = process.env.USSD_CRYPTOHMAC || 'test323@@@£@324342sADqPEHADE';

export default async (headers) => {
  // get the hearder token and decode it

  let token = '';
  if (headers.cookie) {
    const cookieobj = headers.cookie.split('; ').reduce((prev, current) => {
      const [name, value] = current.split('=');
      prev[name] = value; // eslint-disable-line
      return prev;
    }, {});
    token = cookieobj.token || cookieobj.stoken;
  } else {
    token = headers.authorization || '';
  }

  try {
    const user = await jwt.verify(token, scret);
    return { user };
  } catch (error) {
    // debug(error.message);
    // debug('You are not logged in');
    return null;
  }
};
