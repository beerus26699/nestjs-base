import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthRequired, User } from 'src/shared/decorators/auth.decorator';
import { Serialize } from 'src/middleware/interceptors/serialize.interceptor';
import { UserRes } from './responses/user.response';

@Controller('users')
@ApiTags('Users')
@AuthRequired()
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('check-auth')
    @ApiOperation({ summary: 'Check JWT Token' })
    checkAuth(@User('userId') userId: number) {
        console.log(
            '🚀 ~ file: users.controller.ts:24 ~ UsersController ~ checkAuth ~ userId:',
            userId,
        );
        return true;
    }

    @Get()
    @ApiOperation({ summary: 'Get all users' })
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    @Serialize(UserRes)
    @ApiOperation({ summary: 'Get one user' })
    findOne(@Param('id') id: string) {
        return this.usersService.findOneById(+id);
    }

    // @Post()
    // create(@Body() createUserDto: CreateUserDto) {
    //     return this.usersService.create(createUserDto);
    // }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    //     return this.usersService.update(+id, updateUserDto);
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.usersService.remove(+id);
    // }
}
