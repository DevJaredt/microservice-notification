export interface IQueueService {
    queueNotification(notificationData: any): Promise<void>;
    processJobs(): void;
}