const axios = require('axios');

class TelegramNotifier {
    constructor() {
        this.token = process.env.TELEGRAM_BOT_TOKEN;
        this.chatId = process.env.TELEGRAM_CHAT_ID;
        this.baseUrl = `https://api.telegram.org/bot${this.token}`;
    }

    async sendMessage(message) {
        if (!this.token || !this.chatId) {
            console.log('Telegram not configured, skipping notification');
            return false;
        }

        try {
            const response = await axios.post(`${this.baseUrl}/sendMessage`, {
                chat_id: this.chatId,
                text: message,
                parse_mode: 'HTML'
            });

            if (response.data.ok) {
                console.log('📱 Telegram notification sent');
                return true;
            }
            return false;
        } catch (error) {
            console.error('Failed to send Telegram message:', error.message);
            return false;
        }
    }

    async sendGasAlert(gasData) {
        const message = `🚨 <b>Low Gas Alert!</b>

⛽ Current Prices:
🟢 Safe: <code>${gasData.safe} gwei</code>
🟡 Standard: <code>${gasData.standard} gwei</code>
🔴 Fast: <code>${gasData.fast} gwei</code>

💡 Good time to make transactions!
⏰ ${new Date().toLocaleString()}`;

        return await this.sendMessage(message);
    }
}

module.exports = TelegramNotifier;