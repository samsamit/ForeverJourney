"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isEmpty = (string) => {
    if ((string === null || string === void 0 ? void 0 : string.trim()) === '')
        return true;
    else
        return false;
};
const isEmail = (email) => {
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email === null || email === void 0 ? void 0 : email.match(emailRegEx))
        return true;
    else
        return false;
};
exports.validateSignupData = (data) => {
    const errors = {};
    if (isEmpty(data.email)) {
        errors.email = "Must not be empty";
    }
    else if (!isEmail(data.email)) {
        errors.email = "Must be valid address";
    }
    if (isEmpty(data.password))
        errors.password = 'Must not be empty';
    if (data.password != data.confirmPassword)
        errors.confirmPassword = 'Passwords must match';
    if (isEmpty(data.handle))
        errors.handle = 'Must not be empty';
    return {
        errors,
        valid: Object.keys(errors).length === 0,
    };
};
exports.validateLoginData = (data) => {
    let errors = {};
    if (isEmpty(data.email))
        errors.email = "Must not be empty";
    else if (!isEmail(data.email))
        errors.email = "Must be valid address";
    if (isEmpty(data.password))
        errors.password = 'Must not be empty';
    return {
        errors,
        valid: Object.keys(errors).length === 0,
    };
};
exports.reduceUserDetails = (data) => {
    let userDetails = {
        bio: undefined,
    };
    if (!isEmpty(data.bio.trim()))
        userDetails.bio = data.bio;
    return userDetails;
};
exports.validateCharacter = (data) => {
    let errors = {};
    if (data.name.trim() === '')
        errors.name = 'Character must have name!';
    if (data.race.trim() === '')
        errors.name = 'Character must have race!';
    return {
        errors,
        valid: Object.keys(errors).length === 0,
    };
};
//# sourceMappingURL=validators.js.map