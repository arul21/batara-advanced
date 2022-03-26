const { createClient } = require('redis');

const client = createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

// const client = createClient({
//   host: 'redis-18233.c263.us-east-1-2.ec2.cloud.redislabs.com',
//   port: 18233,
// });

module.exports = client;
