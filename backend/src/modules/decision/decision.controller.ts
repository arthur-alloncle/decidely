// routes/decision.ts
import { Request, Response } from "express";
import { Decision } from "../../models/Decision";
import { Category } from "../../models/Category";
import { v4 as uuidv4 } from "uuid";
import { CreatedAt } from "sequelize-typescript";
import { where } from "sequelize";

interface IGetUserAuthInfoRequest extends Request {
  user?: { id: string }; // or any other type
}

export const create = async (req: IGetUserAuthInfoRequest, res: Response) => {
  try {
    const { title, category_id, outcome, importance, confidence } = req.body;

    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Non authentifié" });
    }

    // 1. Vérifier catégorie existe
    const category = await Category.findByPk(category_id);

    if (!category) {
      return res.status(404).json({ message: "Catégorie introuvable" });
    }

    // 2. Création décision
    const decision = await Decision.create({
      id: uuidv4(),
      title,
      outcome,
      importance,
      confidence,
      user_id: userId,
      category_id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return res.status(201).json(decision);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

export const list = async (req: IGetUserAuthInfoRequest, res: Response) => {
  try {
    const { page = "1", limit = "10", categoryId } = req.query;
    const userId = req.user?.id;

    const pageNumber = parseInt(page as string, 10);
    const pageSize = parseInt(limit as string, 10);
    const offset = parseInt(page as string, pageSize);

    const where: any = {};

    if (!userId) {
      return res.status(401).json({ status: 401, message: "Unauthorized" });
    }

    where.user_id = userId;

    if (categoryId) {
      where.category_id = categoryId;
    }

    const { rows, count } = await Decision.findAndCountAll({
      where,
      limit: pageSize,
      offset,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["id", "name", "display_name"],
        },
      ],
    });
    return res.status(200).json({
      status: 200,
      data: rows,
      pagination: {
        total: count,
        page: pageNumber,
        pageSize,
        totalPages: Math.ceil(count / pageSize),
      },
      message: "Decisions fetched",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, message: "Error fetching decision; Server error" });
  }
};

export const listAll = async (req: IGetUserAuthInfoRequest, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: "Non authentifié" });
  }
  const decisions = await Decision.findAll({
    where: { user_id: userId },
    order: [["createdAt", "DESC"]],
  });

  return res.json(decisions);
};

export const update = async (req: IGetUserAuthInfoRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const outcome = req.body.outcome;
    const decisionId = req.body.id;
    if (!userId) {
      return res.status(401).json({ message: "Non authentifié" });
    }

    const updateDecision = await Decision.update(
      {
        outcome,
        updatedAt: new Date(),
      },
      {
        where: {
          user_id: userId,
          id: decisionId,
        },
      },
    );
    return res.status(204).json({
      status: 204,
      message: "Successfuly updated",
      data: updateDecision,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: 500, message: "Error updating decision; Server error" });
  }
};
