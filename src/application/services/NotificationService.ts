import { injectable } from 'inversify';

@injectable()
export class NotificationService {
    sendNotificationMessage(userId: string, message: string): void {
        console.log(`Enviando mensaje a ${userId}: ${message}`);
    }
}
