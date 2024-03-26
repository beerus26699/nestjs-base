import { IsString, IsDefined, IsInt, IsBoolean, IsOptional } from 'class-validator';

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

    @IsBoolean()
    @IsOptional()
    logging: boolean;
}
