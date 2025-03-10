import { Queue, Worker } from "bullmq";
import IORedis from "ioredis";
import { IQueueService } from "../../domain/interfaces/IQueueService";

export class QueueService implements IQueueService {
  private connection: IORedis;
  private queue: Queue;

  constructor() {
    this.connection = new IORedis({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASSWORD,
      maxRetriesPerRequest: null,
    });

    this.queue = new Queue("notificationQueue", {
      connection: this.connection,
    });
    console.log('QueueService: Queue initialized');
  }

  async queueNotification(notificationData: any): Promise<void> {
    console.log('QueueService: Creating queue...');
    await this.queue.add("sendNotification", notificationData);
  }

  async addJob(data: any) {
    console.log('QueueService: Adding job to queue...', data);
    await this.queue.add("sendNotification", data);
  }

  processJobs() {
    const worker = new Worker(
      "notificationQueue",
      async (job) => {
        if (job) {
          console.log(`Processing job ${job.id} with data:`, job.data);
        }
      },
      { connection: this.connection }
    );

    worker.on("completed", (job) => {
      if (job) {
        console.log(`Job ${job.id} completed`);
      }
    });

    worker.on("failed", (job, err) => {
      if (job) {
        console.error(`Job ${job.id} failed with error:`, err);
      }
    });
  }
}