import { Router } from "express";
import { createMessage } from "./chat.controllers";
import {
  asyncMiddleware,
  transformMessageToJSON,
  validateJWT,
  validateMiddleware,
} from "../../middlewares";
import { errorMessageHandlerMiddleware } from "./chat.errors";
import { createMessageSchema } from "./chat.schema";
import { multerConfig } from "../../helpers";

const router = Router();
router.use(validateJWT);

router.post(
  "/",
  multerConfig.any(),
  transformMessageToJSON,
  validateMiddleware(createMessageSchema),
  asyncMiddleware(createMessage)
);

// Error handling middleware for /message routes
router.use(errorMessageHandlerMiddleware);

export default router;
