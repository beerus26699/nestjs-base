import { Inject, Injectable, Logger, LoggerService as LoggerServiceCore } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserModel } from 'src/entities/user.entity';
import { LoggerFactoryService } from 'src/shared/logger/logger-factory.service';
import { LoggerService } from 'src/shared/logger/logger.service';

@Injectable()
export class UsersService {
    private model: typeof UserModel;
    private logger: LoggerService;

    constructor(private loggerFactory: LoggerFactoryService) {
        this.model = UserModel;
        this.logger = loggerFactory.createLogger(UsersService.name);
    }
    async create(createdUser: Partial<UserModel>): Promise<UserModel> {
        return await this.model.create(createdUser);
    }

    async findAll(): Promise<UserModel[]> {
        this.logger.debug('log1');
        this.loggerFactory.logFile('a111').info('log24444');
        this.loggerFactory.logFile('a222').info('log24444');
        this.logger.debug('log3');
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
