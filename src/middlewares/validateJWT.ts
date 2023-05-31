import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";

interface TokenPayload {
  uid: string;
}

export const validateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      ok: false,
      message: "No token provided",
    });
  }

  const secret: Secret = process.env.SECRET_JWT_SEED || "";

  try {
    // const { uid } = 
    jwt.verify(token, secret) as TokenPayload;
    // req.body.uid = uid;
    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      message: "Invalid token",
    });
  }
};
