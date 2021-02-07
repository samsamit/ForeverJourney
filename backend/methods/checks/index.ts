import { PasswordCheckService, PasswordCheckStrength } from "./passStrength";

export const isEmpty = (string: String) => {
    return (!string || 0 === string.trim().length);
}

export const isEmail = (email: string):boolean => {
    const regexp = new RegExp('/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/');
    return regexp.test(email)
}

export const checkPassword = (pass: string) => {
    if(isEmpty(pass))return {valid: false, error: "Pasword cant be empty"}
    switch(PasswordCheckService(pass) as PasswordCheckStrength){
        case PasswordCheckStrength.Common:
            return {valid: false, error: "Pasword too common"}
        case PasswordCheckStrength.Ok:
            return {valid: true}
        case PasswordCheckStrength.Short:
            return {valid: false, error: "Pasword too short"}
        case PasswordCheckStrength.Strong:
            return {valid: true}
        case PasswordCheckStrength.Weak:
            return {valid: false, error: "Pasword too weak"}
        default:
            return {valid: false, error: "something went wrong"}
    }
}