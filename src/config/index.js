require('dotenv').config();

export default {
  redis: {
    port: process.env.REDIS_PORT || 6379,
    host: process.env.REDIS_IP_ADDR || '127.0.0.1',
    family: process.env.REDIS_FAMILY || 4,
  },
};
