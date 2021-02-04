import mongoose from 'mongoose';
import User from './user';
import Message from './message';
import config from "../config"
 
const connectDb = () => {
  mongoose.set('useCreateIndex', true);
  return mongoose.connect(config.dev.DB, config.mongoDbConfig);
};
 
const models = { User, Message };
 
export { connectDb };
 
export default models;