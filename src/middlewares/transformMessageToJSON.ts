import { NextFunction, Request, Response } from "express";

export const transformMessageToJSON = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const transformFieldToJSON = (field: string) => {
    if (req.body[field] && typeof req.body[field] !== "object") {
      try {
        req.body[field] = JSON.parse(req.body[field]);
      } catch (error) {
        return res.status(400).json({ error: "Invalid format for " + field });
      }
    }
  };

  transformFieldToJSON("message");
  transformFieldToJSON("newChat");
  next();
};
