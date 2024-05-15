import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTableDto {
  @ApiProperty()
  @IsString()
  descripcion: string;
}
