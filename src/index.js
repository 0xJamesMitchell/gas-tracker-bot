require('dotenv').config();
const cron = require('node-cron');
const GasTracker = require('./gasTracker');
const config = require('../config/default');

console.log('🚀 Gas Tracker Bot starting...');

const tracker = new GasTracker();
let lastAlert = null;

async function checkGasPrice() {
    console.log('⏰ Checking gas prices...');
    const gasData = await tracker.getCurrentGasPrice();
    
    if (gasData) {
        console.log(tracker.formatGasPrice(gasData));
        
        // Check if we should send alert
        if (gasData.standard <= config.alerts.threshold) {
            const now = Date.now();
            if (!lastAlert || (now - lastAlert > 1800000)) { // 30 min cooldown
                console.log('🔔 Low gas alert triggered!');
                lastAlert = now;
            }
        }
    }
}

// Run immediately
checkGasPrice();

// Schedule periodic checks
cron.schedule('*/5 * * * *', checkGasPrice);

console.log('📅 Scheduled gas price checks every 5 minutes');