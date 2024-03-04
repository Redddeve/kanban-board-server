import { Request, Response } from 'express';
import { Board, Section } from '../../models/kanban';
import ctrlWrapper from '../../utils/ctrlWrapper';

const addBoard = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    const baseColsTitles = ['To Do', 'In Progress', 'Done'];

    const newBoard = new Board({ name });
    const result = await newBoard.save();
    const boardId = result._id;

    for (const title of baseColsTitles) {
      const newSection = new Section({ board: boardId, title });
      await newSection.save();
    }

    await result.save();

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export default ctrlWrapper(addBoard);
