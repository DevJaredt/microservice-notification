import axios from 'axios';
import dotenv from 'dotenv';
import { IMail } from '../../domain/interfaces/IMail';
import { LogType } from '../../domain/enums/LogType';

dotenv.config();

export class LogsService {
    private static LOGS_URL = process.env.LOGS_URL || 'http://25.1.210.11:3001/api/logs';


    static async sendLog(logData: any): Promise<void> {
        
        try {
            const response = await axios.post(this.LOGS_URL, logData);
            console.log('log enviado', response.data);
        } catch (error) {
            console.error("Error enviando el log:",error);
        }
    }

    static async logNotification(notification: IMail, type: LogType): Promise<void>{
        let content = '';
        switch (type) {
            case LogType.POST:
                content = `El usuario ${notification.context?.name} ha sido creado con éxito.`;
                break;
            case LogType.PATCH:
                content = `El usuario ${notification.context?.name} ha sido actualizado con éxito.`;
                break;
            case LogType.ERROR:
                content = `Ha ocurrido un error con el usuario ${notification.context?.name}.`;
                break;
            // Agrega más casos según sea necesario
            default:
                content = 'Operación realizada con éxito.';
            case LogType.POST_:
                content = `la transacción de ${notification.context?.amount} ha sido realizada con éxito.`;
                break;
            case LogType.PATCH_:
                content = `la transacción de ${notification.context?.amount} ha sido actualizada con éxito.`;
        } 
        const logData = {

            service: 'NOTIFICATION_MICROSERVICE',
            payload: {
                to: notification.to,
                subject: notification.subject,
                context: notification.context,
                body: notification.body,
                timestamp: new Date().toISOString()
            },
            type: type,
            content: content,
        }
        console.log('Enviando log:', logData);
        await this.sendLog(logData);
    }
}