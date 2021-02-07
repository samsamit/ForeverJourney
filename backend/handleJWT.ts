import jwt from "jsonwebtoken";
import { Request, Response, NextFunction, RequestHandler } from 'express';
import config from "./config";
import User, { IUser, Roles } from "./models/user";
import { CallbackError } from "mongoose";

interface IUserRequest extends Request {
    userId: string;
}

const verifyToken = (req: IUserRequest, res: Response, next: NextFunction) => {
    let token = req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }
  
    jwt.verify(token as string, config.secretKey, (err, decoded: any) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      req.userId = decoded?.id;
      next();
    });
};

const isAdmin = (req: IUserRequest, res: Response, next: NextFunction) => {
    User.findById(req.userId).exec((err: CallbackError, user: IUser) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if(user.roles.includes(Roles.admin)) next();
      res.status(403).send({error: "Admin role required!"});
    });
  };

const isModerator = (req: IUserRequest, res: Response, next: NextFunction) => {
    User.findById(req.userId).exec((err: CallbackError, user: IUser) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
      if(user.roles.includes(Roles.moderator)) next();
      res.status(403).send({error: "Moderator role required!"});
    });
  };

  const authJwt = {
    verifyToken,
    isAdmin,
    isModerator
  };

  export default authJwt;