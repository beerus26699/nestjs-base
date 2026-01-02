import { StringHelper } from '@app/shared/helpers';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, Min } from 'class-validator';

export class RegisterDto {
    @ApiProperty({
        example: 'admin@example.com',
    })
    @IsNotEmpty()
    @Transform(({ value }: TransformFnParams) => StringHelper.formatStr(value))
    email: string;

    @ApiProperty({
        example: '123456',
    })
    @IsNotEmpty()
    @Min(8)
    @Transform(({ value }: TransformFnParams) => StringHelper.formatStr(value))
    password: string;
}
