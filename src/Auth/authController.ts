import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import prisma from "../config/db";
import { generateToken } from "../utils/jwt";

// Register a new user
export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields are required" });

  try {
    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    const token = generateToken({ id: user.id, role: user.role });

    res
      .status(201)
      .json({ user: { id: user.id, name, email, role: user.role }, token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Login existing user
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken({ id: user.id, role: user.role });

    res.status(200).json({
      user: { id: user.id, name: user.name, email, role: user.role },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
