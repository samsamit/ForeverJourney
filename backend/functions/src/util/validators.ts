import type { Character, Errors } from "../types/types";

const isEmpty = (string) => {
    if (string?.trim() === '') return true;
    else return false;
};
const isEmail = (email) => {
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email?.match(emailRegEx)) return true;
    else return false;
};

exports.validateSignupData = (data) =>{
    const errors = {} as Errors;
    if (isEmpty(data.email)) {
        errors.email = "Must not be empty";
    } else if (!isEmail(data.email)) {
        errors.email = "Must be valid address";
    }

    if (isEmpty(data.password)) errors.password = 'Must not be empty';
    if (data.password != data.confirmPassword) errors.confirmPassword = 'Passwords must match';
    if (isEmpty(data.handle)) errors.handle = 'Must not be empty';

    return {
        errors,
        valid: Object.keys(errors).length === 0,
    };
};

exports.validateLoginData = (data) =>{
    let errors = {} as Errors;

    if (isEmpty(data.email)) errors.email = "Must not be empty";
    else if (!isEmail(data.email)) errors.email = "Must be valid address";
    if (isEmpty(data.password)) errors.password = 'Must not be empty';

    return {
        errors,
        valid: Object.keys(errors).length === 0,
    };
};

exports.reduceUserDetails = (data) =>{
    let errors = {} as Errors;
    return {
        errors,
        valid: Object.keys(errors).length === 0,
    };
};

exports.validateCharacter = (data: Character) => {
    let errors = {} as Errors;
    if(data.name?.trim() === '') errors.name = 'Character must have name!';
    if(data.race?.trim() === '') errors.name = 'Character must have race!';
     
    return {
        errors,
        valid: Object.keys(errors).length === 0,
    };
}