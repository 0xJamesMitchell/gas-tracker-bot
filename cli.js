#!/usr/bin/env node

require('dotenv').config();
const GasTracker = require('./src/gasTracker');
const DataStorage = require('./src/storage');
const TelegramNotifier = require('./src/notifier');

const args = process.argv.slice(2);
const command = args[0];

async function main() {
    const tracker = new GasTracker();
    const storage = new DataStorage();
    const notifier = new TelegramNotifier();

    switch (command) {
        case 'check':
            console.log('Fetching current gas prices...');
            const gasData = await tracker.getCurrentGasPrice();
            if (gasData) {
                console.log(tracker.formatGasPrice(gasData));
            }
            break;

        case 'stats':
            const hours = parseInt(args[1]) || 24;
            const stats = storage.getStats(hours);
            if (stats) {
                console.log(`📊 Gas Price Statistics (${hours}h):`);
                console.log(`Records: ${stats.count}`);
                console.log(`Average: ${stats.avg} gwei`);
                console.log(`Min: ${stats.min} gwei`);
                console.log(`Max: ${stats.max} gwei`);
                console.log(`Current: ${stats.current} gwei`);
            } else {
                console.log('No data available for the specified period');
            }
            break;

        case 'test-notify':
            console.log('Testing Telegram notification...');
            const testData = { safe: 15, standard: 18, fast: 22 };
            const success = await notifier.sendGasAlert(testData);
            console.log(success ? '✅ Test notification sent' : '❌ Failed to send notification');
            break;

        case 'help':
        default:
            console.log(`
Gas Tracker Bot CLI

Usage: node cli.js <command> [options]

Commands:
  check              Get current gas prices
  stats [hours]      Show statistics (default: 24h) 
  test-notify        Send test Telegram notification
  help              Show this help message
            `);
            break;
    }
}

main().catch(console.error);