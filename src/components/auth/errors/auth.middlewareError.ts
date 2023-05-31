import { NextFunction, Response, Request } from "express";
import { ERRORS_NAMES_AUTH } from "./auth.errors";

type ErrorHandling = {
  [key: string]: (res: Response, message: string) => void;
};

const ERRORS_HANDLING: ErrorHandling = {
  userAlreadyRegistered: (res: Response, message: string) => {
    res.status(409).json({ ok: false, message });
  },
  userIsNotRegistered: (res: Response, message: string) => {
    res.status(404).json({ ok: false, message });
  },
  credentialsNotMatch: (res: Response, message: string) => {
    res.status(401).json({ ok: false, message });
  },
  defaultError: (res: Response, message: string) => {
    res.status(500).json({ ok: false, message });
  },
};

export const errorAuthHandlerMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (ERRORS_HANDLING[err.name]) {
    ERRORS_HANDLING[err.name](res, err.message);
  } else {
    ERRORS_HANDLING.defaultError(res, ERRORS_NAMES_AUTH.internalServerError);
  }
};
