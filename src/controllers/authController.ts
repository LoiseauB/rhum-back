import { Request, Response } from "express";
import User from "../models/User";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (user && (await bcrypt.compare(password, user.password))) {
    const SECRET_KEY = process.env.JWT_SECRET;
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      SECRET_KEY,
      { expiresIn: "24h" }
    );
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.json({ message: "connect successfully" });
  } else {
    res.status(401).json({ error: "bad credentials" });
  }
};
