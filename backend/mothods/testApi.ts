import {Request, Response} from "express";
import models from "../models";

export const testAPIRouter = async (req: Request, res: Response) => {
    const user1 = new models.User({
        username: 'rwieruch',
      });
     

     
      const message1 = new models.Message({
        text: 'Published the Road to learn React',
        user: user1.id,
      });

      await message1.save();
     
      await user1.save();

      
    res.send("Api works fine!");
}