import { Router } from "express";
import { createUser, loginUser } from "./auth.controllers";
import { asyncMiddleware, validateMiddleware } from "../../middlewares";
import { createUserSchema, loginUserSchema } from "./auth.schema";
import { errorAuthHandlerMiddleware } from "./errors/auth.middlewareError";

const router = Router();

router.post(
  "/register",
  validateMiddleware(createUserSchema),
  asyncMiddleware(createUser)
);

router.post(
  "/login",
  validateMiddleware(loginUserSchema),
  asyncMiddleware(loginUser)
);

router.use(errorAuthHandlerMiddleware);
export default router;
