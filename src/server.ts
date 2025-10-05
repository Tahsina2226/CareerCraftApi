import { VercelRequest, VercelResponse } from "@vercel/node";
import app from "./app";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    await new Promise<void>((resolve) => {
      app(req as any, res as any);
      resolve();
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
