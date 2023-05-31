import { Router } from "express";
import authRoutes from "./components/auth/auth.network";
import chatRoutes from "./components/chat/chat.network";

export class AppRouter {
  private router: Router;
  private apiPath = {
    auth: "/api/auth",
    chat: "/api/chat",
  };

  constructor() {
    this.router = Router();
    this.setupRoutes();
  }

  private setupRoutes() {
    this.router.use(this.apiPath.auth, authRoutes);
    this.router.use(this.apiPath.chat, chatRoutes);
  }

  public get appRouter() {
    return this.router;
  }
}
