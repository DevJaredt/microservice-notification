import { IMail } from "../../domain/interfaces/IMail";
import { INotificationService } from "../../domain/interfaces/INotificationService";
import { INotificationUseCase } from "../../domain/interfaces/INotificationUseCase";
import { INotificationRepository } from "../../domain/interfaces/INotificationRepository";
import { NOTIFICATION_TYPE } from "../../domain/enums/NotificationType";
import { TEMPLATE_EMAIL } from "../../domain/enums/TemplateEmail";

export class SendNotificationUseCase implements INotificationUseCase {
  constructor(
    private readonly notificationRepository: INotificationRepository,
    private readonly notificationService: INotificationService
  ) {}
  async execute(
    type: NOTIFICATION_TYPE,
    notificationData: IMail
  ): Promise<void> {
    console.log("Notification Type:", type);
    console.log("Notification Data:", notificationData);

    await this.notificationRepository.save(notificationData);

    switch (type) {
      case NOTIFICATION_TYPE.USER_CREATED:
        await this.notificationService.sendTemplateMail({
          to: notificationData.to,
          subject: "Welcome to our platform",
          template: TEMPLATE_EMAIL.REGISTER,
          context: {
            name: notificationData.context?.name,
            email: notificationData.context?.email,
            date: notificationData.context?.date,
          },
        });
        break;
      case NOTIFICATION_TYPE.USER_UPDATED:
        await this.notificationService.sendTemplateMail({
          to: notificationData.to,
          subject: "User updated successfully",
          template: TEMPLATE_EMAIL.UPDATE,
          context: {
            name: notificationData.context?.name,
            lastName: notificationData.context?.lastName,
            phone: notificationData.context?.phone,
            age: notificationData.context?.age,
            gender: notificationData.context?.gender,
            email: notificationData.context?.email,
          },
        });
        break;
      case NOTIFICATION_TYPE.ACCOUNT_SEND_MONEY:
        await this.notificationService.sendTemplateMail({
          to: notificationData.to,
          subject: "Money sent successfully",
          template: TEMPLATE_EMAIL.SEND_MONEY,
          context: {
            name: notificationData.context?.recipient,
            amount: notificationData.context?.amount,
            date: notificationData.context?.date,
            success: notificationData.context?.success,
          },
        });
        break;
      case NOTIFICATION_TYPE.ACCOUNT_GET_MONEY:
        await this.notificationService.sendTemplateMail({
          to: notificationData.to,
          subject: "Money received successfully",
          template: TEMPLATE_EMAIL.GET_MONEY,
          context: {
            sender: notificationData.context?.sender,
            amount: notificationData.context?.amount,
            date: notificationData.context?.date,
          },
        });
    }
  }
}
