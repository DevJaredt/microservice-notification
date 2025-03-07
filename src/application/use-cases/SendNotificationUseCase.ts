export class SendNotificationUseCase {
    async execute(notificationData: any): Promise<void> {
        console.log('send email with data', notificationData)
    }
}