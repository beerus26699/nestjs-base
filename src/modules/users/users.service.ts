import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../schemas/user.schema';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async createMulti(quantity: number): Promise<User[]> {
        const createdUsers: User[] = [];
        for (let i = 0; i < quantity; i++) {
            const newUser = new this.userModel({
                username: 'username',
                avatar: 'avatar',
                displayName: 'Nguyen Van Hai',
                isPDone: false,
                pDoneId: '123',
            });
            createdUsers.push(newUser);
        }
        return this.userModel.insertMany(createdUsers);
    }

    async create(createCatDto): Promise<User> {
        const createdCat = new this.userModel(createCatDto);
        return createdCat.save();
    }

    async findOneByUsername(username: string): Promise<User> {
        const user = await this.userModel.findOne({
            username,
        });
        return user;
    }

    async findAll(dto: { page: number; pageSize: number }) {
        const skip = (dto.page - 1) * dto.page;
        const limit = dto.pageSize;
        const filter: FilterQuery<User> = {
            isPDone: false,
        };
        const users = await this.userModel
            .find(filter)
            .sort({ createdAt: 1 })
            .skip(skip)
            .limit(limit)
            .exec();
        const count = await this.userModel.countDocuments(filter);
        return {
            rows: users,
            count,
        };
    }
}
