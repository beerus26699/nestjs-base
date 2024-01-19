import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserModel } from 'src/entities/user.entity';

@Injectable()
export class UsersService {
    private model: typeof UserModel;
    constructor() {
        this.model = UserModel;
    }
    async create(createdUser: Partial<UserModel>): Promise<UserModel> {
        return await this.model.create(createdUser);
    }

    async findAll(): Promise<UserModel[]> {
        return await this.model.findAll();
    }

    async findOneByUsername(username: string): Promise<UserModel> {
        return await this.model.findOne({ where: { username } });
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
