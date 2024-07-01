import { PartialType } from '@nestjs/swagger';
import { CrearPoblacionObjetivoDto } from './crear-poblacionobjetivo.dto';

export class ActualizarPoblacionObjetivoDto extends PartialType(
  CrearPoblacionObjetivoDto,
) {}
