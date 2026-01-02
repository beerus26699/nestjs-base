import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, Min } from 'class-validator';

export class LoginDto {
    @ApiProperty({
        example: 'admin@example.com',
    })
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        example: '123456',
    })
    @IsNotEmpty()
    @Min(8)
    password: string;
}
