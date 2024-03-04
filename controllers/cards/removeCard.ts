import { Request, Response } from 'express';
import ctrlWrapper from '../../utils/ctrlWrapper';
import { Card } from '../../models/kanban';
import requestError from '../../utils/requestError';

const removeCard = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await Card.findById(id);
    if (!result) {
      return requestError(404, 'Card not found');
    }

    await Card.findByIdAndDelete(id);

    const cards = await Card.find({ section: result.section }).sort('position');

    for (const key in cards) {
      await Card.findByIdAndUpdate(cards[key]._id, {
        $set: { position: key },
      });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export default ctrlWrapper(removeCard);
