import mongoose, {Document, model, Model, Schema} from 'mongoose';
import { IUser } from '../interfaces/user';
 
export interface MUserDocument extends Document, IUser{
    password: string;
}

export interface MUser extends MUserDocument {
  // Methods go here
}

export const Roles = {
  admin: "admin",
  moderator: "moderator",
  user: "user"
}


const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true
    },
    roles: [
      {
        type: String,
      }
    ]
  },
  { timestamps: true },
);



userSchema.statics.findByLogin = async function (login: string) {
    let user = await this.findOne({
      username: login,
    });
   
    if (!user) {
      user = await this.findOne({ email: login });
    }
    return user;
  };

export interface MUserModel extends Model<MUser> {
  findByLogin(login: string): MUserDocument | null
}

 
const User: MUserModel = model<MUser, MUserModel>('User', userSchema);
 
export default User;