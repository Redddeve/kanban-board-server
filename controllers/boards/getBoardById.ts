import { Request, Response } from 'express';
import { Board, Card, Section } from '../../models/kanban';
import requestError from '../../utils/requestError';
import ctrlWrapper from '../../utils/ctrlWrapper';

const getBoardById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const board = await Board.findById(id);

    if (!board) {
      return requestError(404, 'Board not found');
    }

    const sections = await Section.find({ board: id });

    for (const section of sections) {
      const cards = await Card.find({ section: section._id }).sort('position');
      section.cards = cards;
    }
    board.sections = sections;

    res.status(200).json(board);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export default ctrlWrapper(getBoardById);
