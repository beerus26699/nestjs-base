import { Injectable } from '@nestjs/common';
import { UsersDataService } from '@app/shared/modules/users/users-data.service';
import { GetUsersDto } from './dto/get-users.dto';

@Injectable()
export class UsersService {
    constructor(private usersDataService: UsersDataService) {}

    async findAll(dto: GetUsersDto) {
        const { page, limit } = dto;
        const offset = (page - 1) * limit;

        const { rows, count } = await this.usersDataService.findAndCountAll({
            attributes: [
                'id',
                'email',
                'fullName',
                'avatar',
                'role',
                'isActivated',
            ],
            limit,
            offset,
            order: [['id', 'DESC']],
        });

        return {
            items: rows,
            pagination: {
                total: count,
                page,
                limit,
                totalPages: Math.ceil(count / limit),
            },
        };
    }
}
