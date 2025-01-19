const axios = require('axios');

class GasTracker {
    constructor() {
        this.apiKey = process.env.ETHERSCAN_API_KEY;
        this.baseUrl = 'https://api.etherscan.io/api';
    }

    async getCurrentGasPrice() {
        try {
            const response = await axios.get(`${this.baseUrl}?module=gastracker&action=gasoracle&apikey=${this.apiKey}`);
            
            if (response.data.status === '1') {
                return {
                    safe: parseInt(response.data.result.SafeGasPrice),
                    standard: parseInt(response.data.result.ProposeGasPrice),
                    fast: parseInt(response.data.result.FastGasPrice),
                    timestamp: new Date().toISOString()
                };
            }
            throw new Error('API request failed');
        } catch (error) {
            console.error('Error fetching gas price:', error.message);
            return null;
        }
    }

    formatGasPrice(gasData) {
        if (!gasData) return 'Unable to fetch gas prices';
        
        return `⛽ Current Gas Prices:
🟢 Safe: ${gasData.safe} gwei
🟡 Standard: ${gasData.standard} gwei  
🔴 Fast: ${gasData.fast} gwei
📅 ${new Date(gasData.timestamp).toLocaleString()}`;
    }
}

module.exports = GasTracker;