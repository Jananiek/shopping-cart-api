import bcrypt from "bcryptjs"

export const matchPassword = async (password: string, hashPassword: string): Promise<boolean> => {
    const match = await bcrypt.compare(password, hashPassword);
    return match
};