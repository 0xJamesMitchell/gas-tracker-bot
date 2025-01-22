module.exports = {
    intervals: {
        check: process.env.CHECK_INTERVAL || 300000, // 5 minutes
        cleanup: 86400000 // 24 hours
    },
    
    alerts: {
        threshold: process.env.ALERT_THRESHOLD_GWEI || 20,
        enabled: true
    },
    
    api: {
        etherscan: {
            baseUrl: 'https://api.etherscan.io/api',
            key: process.env.ETHERSCAN_API_KEY
        }
    },
    
    storage: {
        maxRecords: 1000,
        retentionHours: 168 // 7 days
    }
};