import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ActivateEmailDto {
    @IsNotEmpty()
    @IsString()
    token: string;
}

export class ResendActivationDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;
}
