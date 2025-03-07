import { inject, injectable } from "inversify";
import { NotificationRepository } from "../../domain/repositories/NotificationRepository";
import { IMail } from "../../domain/interfaces/IMail";

@injectable()
export class SendNotificationUseCase {
    constructor(
        @inject('NotificationRepository') private readonly notificationRepository: NotificationRepository
    ) {
    }
    async execute(notificationData: IMail): Promise <void> {
        console.log('enviando correo con datos', notificationData)
        await this.notificationRepository.save(notificationData)
    }
}