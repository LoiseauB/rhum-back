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
    res
      .status(201)
      .json({ message: `User ${user.pseudo} was created successfully` });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const users = await User.scope("withoutPassword").findAll();
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const findUser = async (req: Request, res: Response) => {
  try {
    const user = await User.scope("withoutPassword").findByPk(
      req.body.userInfos.id
    );
    const userFavorites = await user.getBottles();
    res.json({ user, userFavorites });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  let hashedPassword;
  if(req.body.password) {
    const password = req.body.password
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "password must have min 6 characters" });
    }
    hashedPassword = await bcrypt.hash(password, 10);
  }
  try {
    const [updated] = await User.update({...req.body, password: hashedPassword}, {
      where: { id: req.body.userInfos.id },
    });
    if (updated) {
      const updatedUser = await User.scope("withoutPassword").findByPk(
        req.body.userInfos.id
      );
      return res.json(updatedUser);
    } else {
      res.status(404).json({ error: "user not found" });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const updateUserAdmin = async (req: Request, res: Response) => {
  let hashedPassword;
  if(req.body.password) {
    const password = req.body.password
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "password must have min 6 characters" });
    }
    hashedPassword = await bcrypt.hash(password, 10);
  }
  try {
    const [updated] = await User.update({...req.body, password: hashedPassword}, {
      where: { id: req.body.userId },
    });
    if (updated) {
      const updatedUser = await User.scope("withoutPassword").findByPk(
        req.body.userId
      );
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

export const deleteUserAdmin = async (req: Request, res: Response) => {
  try {
    await User.destroy({ where: { id: req.body.userId } });
    return res.json({ message: "user deleted" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
