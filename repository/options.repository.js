import OptionModel from "../model/option.schema.js";
import QuestionModel from "../model/question.schema.js";


export const Optiondelete=async (optionId)=>{
    try{
    const option = await OptionModel.findById(optionId);
    // if there is no such option
    if (!option) {
      return ({status:400,message: 'option not found'});
    }
    // if option has atleast one vote it won't be deleted
    if (option.votes > 0) {
        return ({status:400,message: 'this option has atleast one vote'});
    }

    const question = await QuestionModel.findById(option.question);

    // remove reference of this option from question's options field
    await question.updateOne({ $pull: { options: optionId } });

    // delete the option
    await OptionModel.findByIdAndDelete(optionId);

    return ({status:200,message: 'option deleted successfully!'});
    }catch(err){
        throw new Error(err); 
    }
}

export const voteAdd=async(optionId)=>{
    try {
        const option = await OptionModel.findById(optionId);
    
        if (!option) {
            return ({status:400,message: 'option not found'});
          }
    
        // add one to the value of votes of option
        option.votes += 1;
    
        option.save();
    
        // add one to the value of total votes of question
        const question = await QuestionModel.findById(option.question);
        question.totalVotes += 1;
    
        question.save();
    
        return ({status:200,option});
      } catch (err) {
        throw new Error(err);
      }
}