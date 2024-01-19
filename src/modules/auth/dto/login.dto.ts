import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class LoginDto {
    @ApiProperty({
        example: 'admin',
    })
    @IsNotEmpty()
    username: string;

    @ApiProperty({
        example: '123456',
    })
    @IsNotEmpty()
    @Length(8, 16)
    password: string;
}
