import { Container } from "inversify";
import { NotificationRepository } from "../domain/repositories/NotificationRepository";
import { MongoNotificationRepository } from "./repositories/MongoNotificationRepository";
import { NodemailerService } from "../application/services/NodemailerService";
import { NotificationService } from "../application/services/NotificationService";
import { SendNotificationUseCase } from "../application/use-cases/SendNotificationUseCase";

const container = new Container()

container.bind<NotificationRepository>('NotificationRepository').to(MongoNotificationRepository);
container.bind<SendNotificationUseCase>("SendNotificationUseCase").to(SendNotificationUseCase);
container.bind<NotificationService>("NotificationService").to(NotificationService);
container.bind<NodemailerService>("NodemailerService").to(NodemailerService);

export { container };