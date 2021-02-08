import axios from "axios"

import API from "../api";
import { IUser } from "../interfaces/user";

export const signin = (iusername: string, ipassword: string) => {
    const signinUser = {
        username: iusername,
        password: ipassword
    }
    API.post("/signin", signinUser)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => console.log(err));
}

export const signup = async (newUser: {username: string, password: string, email: string}) => {
     await API.post("/signup", newUser)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err.response.data));
}