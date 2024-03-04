import { model } from 'mongoose';
import {
  boardSchema,
  cardSchema,
  sectionSchema,
} from '../schemas/mongoose/kanban';

const Board = model('Board', boardSchema);

const Section = model('Section', sectionSchema);

const Card = model('Card', cardSchema);

export { Board, Section, Card };
