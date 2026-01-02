import { IsNotEmpty, IsString } from 'class-validator';

export class ExchangeCodeDto {
    @IsNotEmpty()
    @IsString()
    code: string;
}
