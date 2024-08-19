import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class WxUserLoginDto {
  @IsString()
  @ApiProperty()
  readonly code: string;
}
