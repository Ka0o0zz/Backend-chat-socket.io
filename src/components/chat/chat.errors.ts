import { NextFunction, Request, Response } from "express";
import { createErrorFactory } from "../../errors/errors";

type ErrorHandling = {
  [key: string]: (res: Response, message: string) => void;
};

enum ERRORS_NAMES {
  InvalidData = "InvalidData",
  failedCreateChat = "FailedCreateChat",
  internalServerError = "Internal server error",
}

export const InvalidData = createErrorFactory(ERRORS_NAMES.InvalidData);
export const FailedCreateChat = createErrorFactory(
  ERRORS_NAMES.failedCreateChat
);

const ERRORS_HANDLING: ErrorHandling = {
  InvalidData: (res: Response, message: string) => {
    res.status(409).json({ ok: false, message });
  },
  failedCreateChat: (res: Response, message: string) => {
    res.status(409).json({ ok: false, message });
  },
  defaultError: (res: Response, message: string) => {
    res.status(500).json({ ok: false, message });
  },
};

export const errorMessageHandlerMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (ERRORS_HANDLING[err.name]) {
    ERRORS_HANDLING[err.name](res, err.message);
  } else {
    ERRORS_HANDLING.defaultError(res, ERRORS_NAMES.internalServerError);
    next(err);
  }
};
