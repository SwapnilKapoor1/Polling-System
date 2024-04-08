import express  from 'express';
import { addVote, deleteOption } from '../controllers/options_controller.js';
const optionRouter = express.Router();

optionRouter.delete('/:id/delete', deleteOption);
optionRouter.put('/:id/add_vote', addVote);

export default optionRouter;