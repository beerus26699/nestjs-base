import { IsString, IsDefined, IsInt } from 'class-validator';

export class DatabaseConfig {
    @IsString()
    @IsDefined()
    host: string;

    @IsInt()
    @IsDefined()
    port: number;

    @IsString()
    @IsDefined()
    username: string;

    @IsString()
    @IsDefined()
    password: string;

    @IsString()
    @IsDefined()
    database: string;
}
