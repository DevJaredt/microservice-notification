import express, { Application } from "express";
import { mongooseConnection } from "../database/config/MoongoseConfig";
import { IRouterManager } from "../../domain/interfaces/IRouterManager";
import { IServer } from "../../domain/interfaces/IServer";
import { inject, injectable } from "inversify";
import { TYPES } from "../inversify/inversify.types";

@injectable()
export class ExpressApp implements IServer {
  private readonly app = express.application;
  private readonly PORT = process.env.SERVER_PORT;

  constructor(
    @inject(TYPES.RouterManager)
    private readonly routerManager: IRouterManager<Application>
  ) {
    this.app = express();
    this.initMiddlewares();
    this.initRoutes();
  }

  async initServer(): Promise<void> {
    this.app.listen(this.PORT, async () => {
      try {
        await mongooseConnection();
        console.log("Conectado a MongoDB");
        console.log(`Servidor corriendo en http://localhost:${this.PORT}`);
      } catch (error) {
        console.error("Error al iniciar el servidor:", error);
        process.exit(1);
      }
    });
  }

  private initMiddlewares(): void {
    this.app.use(express.json());
  }

  private initRoutes(): void {
    this.routerManager.manageRoutes(this.app);
  }
}
