import { optionsCreate, questionCreate, questionDelete, questionView } from "../repository/questions.repository.js";


// To create a question
export const createQuestion = async (req, res) => {
  try {
    const { title } = req.body;
    const question = await questionCreate(title);
    question.status==200?
    res.status(question.status).send(question.question):
    res.status(question.status).send(question.message);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
}

// To create an option
export const createOptions = async (req, res) => {
    try{
    const questionId = req.params.id;
    const { text } = req.body;
    const option = await optionsCreate(questionId,text);
    option.status==200?
    res.status(option.status).send(option.option):
    res.status(option.status).send(option.message);
  } catch (err) {
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
}

// To delete a question
export const deleteQuestion = async (req, res) => {
  try {
    const questionId = req.params.id;
    const option = await questionDelete(questionId);
    res.status(option.status).send(option.message);
  } catch (err) {
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
}
  
// To view a question and it's options
export const viewQuestion = async (req, res) => {
  try {
    const questionId = req.params.id;
    const question = await questionView(questionId);
    question.status==200?
    res.status(question.status).send(question.question):
    res.status(question.status).send(question.message);
  } catch (err) {
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
}