let CronJob = require('cron').CronJob;

//CRON
const job = new CronJob('*/30 * * * * *', function() {
    const d = new Date();
    console.log('At Ten Minutes:', d);
});
// Use this if the 4th param is default value(false)
job.start();
//CRON - END

// Export the pool
module.exports = job;