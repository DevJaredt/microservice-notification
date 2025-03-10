import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export class LogsService {
    private static LOGS_URL = process.env.LOGS_URL || '';


    static async sendLog(logData: any): Promise<void> {
        try {
            const response = await axios.post(this.LOGS_URL, logData);
            console.log('log enviado', response.data);
        } catch (error) {
            console.error("Error enviando el log:",error);
        }
    }
}