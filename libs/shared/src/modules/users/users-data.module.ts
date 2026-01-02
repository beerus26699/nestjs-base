import { UserModel } from '@app/shared/models';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersDataService } from './users-data.service';

@Module({
    imports: [SequelizeModule.forFeature([UserModel])],
    providers: [UsersDataService],
    exports: [UsersDataService],
})
export class UsersDataModule {}
