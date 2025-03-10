import { IQueueService } from "../../domain/interfaces/IQueueService";

export class QueueNotificationUseCase {
   constructor(private readonly queueService: IQueueService ) {} 
   async execute(notificationData: any): Promise<void> {
      console.log('QueueNotificationUseCase: Executing...', notificationData);
     await this.queueService.queueNotification(notificationData);
   }
}