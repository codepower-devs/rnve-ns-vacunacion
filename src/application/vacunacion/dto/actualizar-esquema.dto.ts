import { PartialType } from '@nestjs/swagger';
import { CrearEsquemaDto } from './crear-esquema.dto';

export class ActualizarEsquemaDto extends PartialType(CrearEsquemaDto) {
  id: string;
}
