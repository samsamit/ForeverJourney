import {Request, Response} from "express";
import models from "../models";

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