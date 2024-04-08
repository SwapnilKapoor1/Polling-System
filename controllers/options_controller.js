import { Optiondelete, voteAdd } from "../repository/options.repository.js";


// Delete an option
export const deleteOption = async (req, res) => {
  try {
    const optionId = req.params.id;
    const option = await Optiondelete(optionId);
    res.status(option.status).send(option.message);
   
  } catch (err) {
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
}

// To increase the count of votes
export const addVote = async (req, res) => {
  try {
    const optionId = req.params.id;
    const option = await voteAdd(optionId);
    option.status==200?
    res.status(option.status).send(option.option):
    res.status(option.status).send(option.message);
  } catch (err) {
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
}
