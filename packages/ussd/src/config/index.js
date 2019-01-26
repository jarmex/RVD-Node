require('dotenv').config();

const toCamelCase = (strkey) => {
  const str = strkey.replace(/^REDIS_/g, '');
  return str.replace(/^([A-Z])|[\s-_](\w)/g, (match, p1, p2) => {
    if (p2) return p2.toUpperCase();
    return p1.toLowerCase();
  });
};

const getRedisConfig = () => {
  const regex = /^REDIS_.+/;

  const envKeys = Object.keys(process.env)
    .filter((item) => regex.test(item))
    .map((item) => ({
      [toCamelCase(item)]: process.env[item],
    }));
  if (envKeys && envKeys.length > 0) {
    return Object.assign(...envKeys);
  }
  return {};
};

export default {
  redis: {
    ...getRedisConfig(),
  },
};
