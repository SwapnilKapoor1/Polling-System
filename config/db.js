import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const { DB_URL } = process.env;

export const connectWithDb=async()=>{
  try{
    await mongoose.connect(DB_URL);
    console.log('Database has been connected');
  }catch(err){
    console.log(err);
  }
}
