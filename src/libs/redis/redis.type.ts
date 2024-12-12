import { IsBoolean, IsDefined, IsInt, IsString } from 'class-validator';

export class RedisConfig {
  @IsInt()
  @IsDefined()
  port: number;

  @IsString()
  @IsDefined()
  host: string;
}
