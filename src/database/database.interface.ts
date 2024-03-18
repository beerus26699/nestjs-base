import { IsString, IsDefined, IsInt } from 'class-validator';

export class DatabaseConfig {
    @IsString()
    @IsDefined()
    uri: string;

    @IsInt()
    @IsDefined()
    user: string;

    @IsString()
    @IsDefined()
    pass: string;

    @IsString()
    @IsDefined()
    dbName: string;
}
