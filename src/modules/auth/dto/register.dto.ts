import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { StringHelper } from 'src/shared/helpers/string.helper';

export class RegisterDto {
    @ApiProperty({
        example: 'admin',
    })
    @IsNotEmpty()
    @Transform(({ value }: TransformFnParams) => StringHelper.formatStr(value))
    username: string;

    @ApiProperty({
        example: '123456',
    })
    @IsNotEmpty()
    @Transform(({ value }: TransformFnParams) => StringHelper.formatStr(value))
    password: string;
}
