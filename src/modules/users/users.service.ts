import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserModel } from 'src/entities/user.entity';
import { REDIS_CLIENT } from 'src/libs/redis/redis.provider';
import { Redis } from 'ioredis';
import { PREFIX_KEYS } from 'src/libs/redis/redis.constant';

@Injectable()
export class UsersService {
    private model: typeof UserModel;
    constructor(@Inject(REDIS_CLIENT) private readonly redisClient: Redis) {
        this.model = UserModel;
    }
    async create(createdUser: Partial<UserModel>): Promise<UserModel> {
        await this.redisClient.del(PREFIX_KEYS.USER.GET_LIST);
        return await this.model.create(createdUser);
    }

    async findAll(): Promise<UserModel[]> {
        const result = JSON.parse(
            await this.redisClient.get(PREFIX_KEYS.USER.GET_LIST),
        );
        if (!result) {
            console.log('No cache');
            const users = await this.model.findAll();
            await this.redisClient.set(
                PREFIX_KEYS.USER.GET_LIST,
                JSON.stringify(users),
            );

            return users;
        }
        console.log('Has cache');
        return result;
    }

    async findOneByUsername(username: string): Promise<UserModel> {
        return await this.model.findOne({ where: { username } });
    }

    async findOneById(id: number): Promise<UserModel> {
        return await this.model.findOne({ where: { id } });
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
