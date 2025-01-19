require('dotenv').config();
const GasTracker = require('./gasTracker');

console.log('🚀 Gas Tracker Bot starting...');

const tracker = new GasTracker();

async function checkGasPrice() {
    console.log('⏰ Checking gas prices...');
    const gasData = await tracker.getCurrentGasPrice();
    
    if (gasData) {
        console.log(tracker.formatGasPrice(gasData));
    }
}

checkGasPrice();