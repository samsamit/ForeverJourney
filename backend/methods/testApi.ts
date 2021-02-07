import {Request, Response} from "express";
import models from "../models";

export const testAPIRouter = async (req: Request, res: Response) => {
      
    res.send("Api works fine!");
}