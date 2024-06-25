import { PartialType } from '@nestjs/swagger';
import { CrearEsquemaDto } from './crear-esquema.dto';
import { IsString } from 'class-validator';

export class ActualizarEsquemaDto extends PartialType(CrearEsquemaDto) {
  @IsString()
  id: string;
}
