import jwt, { SignOptions, JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

interface TokenPayload {
  id: string;
  role: string;
}

export const generateToken = (
  payload: TokenPayload,
  expiresIn: string | number = "1h"
): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn } as SignOptions);
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};
