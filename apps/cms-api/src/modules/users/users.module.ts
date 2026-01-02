import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersDataModule } from '@app/shared/modules/users/users-data.module';

@Module({
    imports: [UsersDataModule],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
