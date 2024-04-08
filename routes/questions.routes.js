import express from 'express';
import { createOptions, createQuestion, deleteQuestion, viewQuestion } from '../controllers/questions_controller.js';

const questionRouter = express.Router();

questionRouter.post('/create', createQuestion);
questionRouter.post('/:id/options/create', createOptions);
questionRouter.delete('/:id/delete', deleteQuestion)
questionRouter.get('/:id', viewQuestion)

export default questionRouter;
