import { PartialType } from '@nestjs/swagger';
import { CrearProgramaVacunacionDto } from './crear-programavacunacion.dto';

export class ActualizarProgramaVacunacionDto extends PartialType(
  CrearProgramaVacunacionDto,
) {}
