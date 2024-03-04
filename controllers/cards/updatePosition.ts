import { Request, Response } from 'express';
import ctrlWrapper from '../../utils/ctrlWrapper';
import { Board, Card } from '../../models/kanban';
import requestError from '../../utils/requestError';

const updatePosition = async (req: Request, res: Response) => {
  const { boardId, sourceList, destList, sourceColId, destColId } = req.body;

  try {
    const board = await Board.findById(boardId);
    if (!board) {
      return requestError(404, 'Board not found');
    }

    if (sourceColId !== destColId) {
      for (const key in sourceList) {
        await Card.findByIdAndUpdate(
          sourceList[key]._id,
          { position: key },
          { new: true },
        );
      }
    }
    for (const key in destList) {
      await Card.findByIdAndUpdate(
        destList[key]._id,
        { section: destColId, position: key },
        { new: true },
      );
    }

    res.status(200).json({ message: 'updated' });
  } catch (err) {
    res.status(500).json(err);
  }
};
export default ctrlWrapper(updatePosition);
