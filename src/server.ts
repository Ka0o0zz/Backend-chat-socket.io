import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import { AppRouter } from "./router";
import path from "path";
import { connectToDatabase } from "./helpers";
import { Server as ServerHttp } from "http";
import { Server as ServerIO } from "socket.io";

export class Server {
  private app: Application;
  private port: number;
  private appRouter: AppRouter;
  private server: ServerHttp;
  private io: ServerIO;

  constructor() {
    this.app = express();
    this.server = new ServerHttp(this.app);
    this.io = new ServerIO(this.server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });
    this.port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
    this.appRouter = new AppRouter();
    this.connectionWithDBS();
    this.setupMiddlewares();
    this.setupRoutesNotFound();
    this.setupErrorHandling();
  }

  private async connectionWithDBS() {
    await connectToDatabase();
  }

  private setupMiddlewares() {
    //cors
    this.app.use(cors({ origin: "http://127.0.0.1:5173" }));

    this.app.use(express.static(path.join(__dirname, "../public/uploads")));

    this.app.use(express.json());

    this.app.use(helmet());

    //router
    this.app.use(this.appRouter.appRouter);
  }

  private setupRoutesNotFound() {
    this.app.use((_req: Request, res: Response) => {
      res.status(404).send("Route not found");
    });
  }

  private setupErrorHandling() {
    this.app.use(
      (err: any, _req: Request, res: Response, _next: NextFunction) => {
        console.error(err.stack);
        res.status(500).send("Something broke!");
      }
    );
  }

  public socket() {
    return this.io;
  }

  public listen() {
    this.server.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
