import bcript from 'bcryptjs';

class Utils {
    public async hashPassword(password: string): Promise<string> {
        const salt = await bcript.genSaltSync(10);
        return await bcript.hashSync(password, salt);
    }
    public async checkPassword(password: string, encryptedPassword: string): Promise<boolean> {
        return await bcript.compareSync(password, encryptedPassword);
    }
}
export const utils = new Utils();