import { Request, Response } from "express";
import Bottle from "../models/Bottle";

export const getAllBottles = async (req: Request, res: Response) => {
  try {
    const bottles = await Bottle.findAll();
    res.json({ bottles });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const findBottle = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const bottle = await Bottle.findByPk(id);
    if (!bottle) {
      return res.status(404).json({ error: "bottle not found" });
    }
    res.json({ bottle });
  } catch (error) {
    res.status(500).json({ error });
  }
};
