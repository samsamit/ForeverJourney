import {Request, Response} from "express";
import config from "../config";
import models from "../models";
import User, { MUserDocument, Roles } from "../models/user";
import { checkPassword, isEmail, isEmpty } from "./checks";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser } from "../interfaces/user";

const createJwt = (userId: string) => {
  return jwt.sign({ id: userId }, config.secretKey, {
    expiresIn: 86400 // 24 hours
  });
}


export const testAPIRouter = async (req: Request, res: Response) => {
    const user1 = new models.User({
        username: 'rwieruch',
      });
     
      await user1.save().catch(err => {
        console.log(err);
        res.send("Chatched an error!!");
      });

      
    res.send("Api works fine!");
}

export const signin = async (req: Request, res: Response) => {
  if(isEmpty(req.body.username)) return res.status(400).send({name: "Username cant be empty"});
  if(isEmpty(req.body.password)) return res.status(400).send({password: "Password cant be empty"});
  //Check if user exists
  const user = await User.findByLogin(req.body.username);
  if(user === null) return res.status(400).send({password: "You dont exist bruh?!"});
  //Check if password ok
  const passOk = await bcrypt.compare(req.body.password, user?.password!);
  if(!passOk) return res.status(401).send({password: "Wrong password dude!"});

  let token = await createJwt(user!.id);

  const resUser: IUser = {
    email: user.email,
    roles: user.roles,
    username: user.username,
    createdAt: user.createdAt
  }

  return res.status(200).send({resUser, token});
}

export const signup = async (req: Request, res: Response) => {
    if(isEmpty(req.body.username)) return res.status(400).send({name: "Username cant be empty"});
    if(isEmail(req.body.email)) return res.status(400).send({email: "Email cant be empty"});
    if(!checkPassword(req.body.password).valid) return res.status(400).send({password: checkPassword(req.body.password).error});

    const newUser: MUserDocument = new User({
        username: req.body.username,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 8),
        roles: [Roles.user]
    });

    await newUser.save().then(() => {
      let token = createJwt(newUser!.id);
      return res.status(200).send({user: newUser, token})
    }).catch(err => {
      if (err.name === 'MongoError' && err.code === 11000) {
        // Duplicate username
        return res.status(422).send({error: 'User already exist!' });
      }
      return res.status(422).send({error: "Something went wrong!?"});
    });   
}

