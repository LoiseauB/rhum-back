import { Request, Response } from "express";
import Rating from "../models/Rating";

export const addRate = async (req: Request, res: Response) => {
  try {
    const { bottleId, userInfos, rating } = req.body;
    await Rating.create({ bottleId, userId: userInfos.id, rating });
    res.json({ message: "rate added" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateRate = async (req: Request, res: Response) => {
  try {
    const { bottleId, userInfos, rating } = req.body;
    const [updated] = await Rating.update({rating}, {
      where: { bottleId: bottleId, userId: userInfos.id },
    });
    if (updated) {
      return res.json({ message: "rate updated" });
    }
    res.status(404).json({ error: "rate don't found" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const deleteRate = async (req: Request, res: Response) => {
  try {
    const { bottleId, userInfos } = req.body;
    await Rating.destroy({
      where: { bottleId: bottleId, userId: userInfos.id },
    });
    return res.json({ message: "rate deleted" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
