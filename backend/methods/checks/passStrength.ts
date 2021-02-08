// Password strengths
export const enum PasswordCheckStrength {
    Short,
    Common,
    Weak,
    Ok,
    Strong,
};

// Object to check password strengths and various properties
export const PasswordCheckService = (password: string) => {


    // Regex to check for a common password string - all based on 5+ length passwords
    const commonPasswordPatterns = /passw.*|12345.*|09876.*|qwert.*|asdfg.*|zxcvb.*|footb.*|baseb.*|drago.*/;

    // Build up the strenth of our password
    let numberOfElements = 0;
    numberOfElements = /.*[a-z].*/.test(password) ? ++numberOfElements : numberOfElements;      // Lowercase letters
    numberOfElements = /.*[A-Z].*/.test(password) ? ++numberOfElements : numberOfElements;      // Uppercase letters
    numberOfElements = /.*[0-9].*/.test(password) ? ++numberOfElements : numberOfElements;      // Numbers
    numberOfElements = /[^a-zA-Z0-9]/.test(password) ? ++numberOfElements : numberOfElements;   // Special characters (inc. space)

    // Assume we have a poor password already
    let currentPasswordStrength = PasswordCheckStrength.Short;

    // Check then strenth of this password using some simple rules
    if (password === null || password.length < 5) {
        currentPasswordStrength = PasswordCheckStrength.Short;
    } else if (commonPasswordPatterns.test(password)) {
        currentPasswordStrength = PasswordCheckStrength.Common;
    } else if (numberOfElements === 0 || numberOfElements === 1 || numberOfElements === 2) {
        currentPasswordStrength = PasswordCheckStrength.Weak;
    } else if (numberOfElements === 3) {
        currentPasswordStrength = PasswordCheckStrength.Ok;
    } else {
        currentPasswordStrength = PasswordCheckStrength.Strong;
    }
    // Return the strength of this password
    return currentPasswordStrength;
}