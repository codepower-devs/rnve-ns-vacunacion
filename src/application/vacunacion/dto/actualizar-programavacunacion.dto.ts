import { PartialType } from '@nestjs/swagger';
import { CrearProgramaVacunacionDto } from './crear-programavacunacion.dto';
import { IsString } from 'class-validator';

export class ActualizarProgramaVacunacionDto extends PartialType(
  CrearProgramaVacunacionDto,
) {
  @IsString()
  id: string;
}
