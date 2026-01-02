import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation } from '@nestjs/swagger';
import { User } from '@app/core/decorators/auth.decorator';
import { Roles } from '@app/core/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { GetUsersDto } from './dto/get-users.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @UseGuards(RolesGuard)
    @Roles('admin')
    @ApiOperation({ summary: 'Get all users (Admin only)' })
    async findAll(@Query() query: GetUsersDto) {
        return this.usersService.findAll(query);
    }

    @Post('check-auth')
    @ApiOperation({ summary: 'Check JWT Token' })
    checkAuth(@User('userId') userId: number) {
        console.log(
            '🚀 ~ file: users.controller.ts:24 ~ UsersController ~ checkAuth ~ userId:',
            userId,
        );
        return true;
    }

    // @Get(':id')
    // @Serialize(UserRes)
    // @ApiOperation({ summary: 'Get one user' })
    // findOne(@Param('id') id: string) {
    //     return this.usersService.findOneById(+id);
    // }
}
