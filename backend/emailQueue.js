const Queue = require('bull');
require('dotenv').config();

const emailQueue = new Queue('email', process.env.REDIS_URL);

function sendEmailJob(data) {
  return emailQueue.add(data, {
    attempts: 3,
    backoff: 5000,
  });
}

module.exports = { sendEmailJob };
