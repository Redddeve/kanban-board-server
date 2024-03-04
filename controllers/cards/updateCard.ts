import { Request, Response } from 'express';
import { Card } from '../../models/kanban';
import ctrlWrapper from '../../utils/ctrlWrapper';
import requestError from '../../utils/requestError';

const updateCardContent = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const card = await Card.findById(id);
    if (!card) {
      return requestError(404, 'Card not found');
    }

    const result = await Card.findByIdAndUpdate(id, req.body, { new: true });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export default ctrlWrapper(updateCardContent);
