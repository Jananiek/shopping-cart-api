import { UserRepository } from '../repositories';
import bcrypt from 'bcryptjs'
import { IInputUser } from '../interfaces/IInputUser';
import { HTTP404Error } from '../../../middleware/errorManager/errorHandle/customErrors';
import { User } from '../../../typeorm/entities/User';

export class UserService {
    protected userRepo: UserRepository;
    constructor() {
        this.userRepo = new UserRepository();
    }
    public async emailExists(email: string): Promise<User> {
        const user = await this.userRepo.getOneByEmail(email)
        if (!user) return null
        else return user
    }
    public async createUser(inputUser: IInputUser): Promise<User> {
        const { email, password, mobile } = inputUser
        const oldUser = await this.emailExists(email)
        if (oldUser) {
            throw new HTTP404Error('User with email already exists')
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return await this.userRepo.createOne({ email, password: hash, mobile })
    }

}
