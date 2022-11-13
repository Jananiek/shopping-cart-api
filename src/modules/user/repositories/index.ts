import { getConnection, getRepository } from "typeorm";
import { User } from "../../../typeorm/entities/User";
import { IInputUser } from "../interfaces/IInputUser";

export class UserRepository {
    async createOne(user: IInputUser): Promise<User> {
        try {
            const { raw } = await getConnection().createQueryBuilder().insert().into(User).values(user).returning('id').execute();
            if (raw[0]) {
                return raw[0]
            }
        } catch (e) {
            throw new Error(e.message);
        }
    }

    public async getOneByEmail(email: string): Promise<User> {
        return await getRepository(User).findOne({ where: { email } });
    }
}