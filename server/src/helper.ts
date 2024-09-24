export const validateEmail = (email: string): boolean => {
    const regexExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regexExp.test(email);
}

export const validatePassword = (password: string): boolean => {
    const regexExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regexExp.test(password);
}