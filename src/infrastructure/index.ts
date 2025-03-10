
import { IQueueService } from "../domain/interfaces/IQueueService";
import { IServer } from "../domain/interfaces/IServer";
import { container } from "./inversify/inversify.config";
import { TYPES } from "./inversify/inversify.types";


const expressApp = container.get<IServer>(TYPES.ExpressApp);
const queueService = container.get<IQueueService>(TYPES.QueueService);

expressApp.initServer();
queueService.processJobs();

