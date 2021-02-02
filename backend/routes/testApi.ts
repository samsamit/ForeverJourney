import {Request, Response} from "express";

export const testAPIRouter = (req: Request, res: Response) => {
    res.send("Api works fine!");
}