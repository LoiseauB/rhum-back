import { Request, Response } from "express";
import User from "../models/User";
const bcrypt = require("bcrypt");

export const register = async (req: Request, res: Response) => {
  const { email, password, pseudo } = req.body;
  if (password.length < 6) {
    return res
      .status(400)
      .json({ error: "password must have min 6 characters" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({
      email,
      password: hashedPassword,
      pseudo,
      role: "USER",
    });
    res
      .status(201)
      .json({ message: `User ${user.pseudo} was created successfully` });
  } catch (error) {
    res.status(500).json({ error });
  }
};
