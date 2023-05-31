import jwt, { Secret } from "jsonwebtoken";

interface TokenPayload {
  uid: string;
}

export const generateJWT = (uid: string): Promise<string> => {
  const secret: Secret = process.env.SECRET_JWT_SEED || "";

  return new Promise((resolve, reject) => {
    const payload: TokenPayload = { uid };

    jwt.sign(
      payload,
      secret,
      { expiresIn: "24h" },
      (err: Error | null, token: string | undefined) => {
        if (err) {
          console.error(err);
          reject(new Error("Failed to generate token"));
        }

        if (token) {
          resolve(token);
        } else {
          reject(new Error("No token was generated"));
        }
      }
    );
  });
};
