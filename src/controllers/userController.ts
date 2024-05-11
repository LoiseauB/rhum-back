import { Request, Response } from "express";
import User from "../models/User";

const bcrypt = require("bcrypt");

export const createUser = async (req: Request, res: Response) => {
  const { email, password, pseudo, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({
      email,
      password: hashedPassword,
      pseudo,
      role,
    });
    return res
      .status(201)
      .json({ message: `User ${user.pseudo} was created successfully` });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    return res.json({ users });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const findUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.body.userInfos.id);
    return res.json({ user });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const [updated] = await User.update(req.body, {
      where: { id: req.body.userInfos.id },
    });
    if (updated) {
      const updatedUser = await User.findByPk(req.body.userInfos.id);
      return res.json(updatedUser);
    } else {
      res.status(404).json({ error: "user not found" });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await User.destroy({ where: { id: req.body.userInfos.id } });
    return res.json({ message: "user deleted" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
