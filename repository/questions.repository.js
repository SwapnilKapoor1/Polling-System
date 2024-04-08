import OptionModel from "../model/option.schema.js";
import QuestionModel from "../model/question.schema.js";


export const questionCreate=async (title)=>{
    try {
        if (!title) {
          return ({status:400,  message: 'title is required for creating question'});
        }
        const question = new QuestionModel({
          title,
        });
        question.save();
        return ({status:200, question});
      } catch (err) {
        throw new Error(err);
      }
}

export const optionsCreate=async (questionId,text)=>{
    try {
        if (!text) {
          return ({status:400, message: 'text required for creating option',});
        }
        const question = await QuestionModel.findById(questionId);   
        if (!question) {
            return ({status:400, message: 'question not found!',});
        }  
        const option = new OptionModel({
          text,
          question,
        });
        // create link_to_vote using _id of option
        const link_to_vote = `http://localhost:3000/options/${option.id}/add_vote`;
    
        option.link_to_vote = link_to_vote;
    
        option.save();
    
        // put reference of option in question schema
        await question.updateOne({ $push: { options: option } });
        return ({status:200, option});
      } catch (err) {
        throw new Error(err);
      }
}

export const questionDelete=async (questionId)=>{
  try{
    const question = await QuestionModel.findById(questionId);

    if (!question) {
      return ({status:400, message: 'question not found!',});
  }  

    // if even one of the options of question has votes. It won't be deleted
    if (question.totalVotes > 0) {
        return ({status:400, message: 'atleast one of options has votes',});
    }  

    // delete all the options of the question
    await OptionModel.deleteMany({ question: questionId });

    // delete question
    await QuestionModel.findByIdAndDelete(questionId);
    return ({status:200, message: 'question and associated options deleted successfully!',});
  } catch (err) {
    throw new Error(err);
  }
}

export const questionView=async (questionId)=>{
  try{
  const question = await QuestionModel.findById(questionId).populate({
    path: 'options',
    model: 'Option',
  });

  if (!question) {
    return ({status:400, message: 'question not found!',});
  }  

  return ({status:200, question});

  } catch (err) {
     throw new Error(err);
   }
};