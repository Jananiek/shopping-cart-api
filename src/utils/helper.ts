import bcrypt from "bcryptjs"

export const matchPassword = async (password: string, hashPassword: string): Promise<boolean> => {
    const match = await bcrypt.compare(password, hashPassword);
    return match
};
export const removeNullOrUndefinedValues = (options: Record<string, any>): any => {
    Object.keys(options).forEach(key => {
        if (options[key] === null || options[key] === undefined) {
            delete options[key];
        }
    });
    return options;
};