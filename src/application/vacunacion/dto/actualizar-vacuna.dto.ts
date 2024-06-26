import { PartialType } from '@nestjs/swagger';
import { CrearVacunaDto } from './crear-vacuna.dto';
import { IsString } from 'class-validator';

export class ActualizarVacunaDto extends PartialType(CrearVacunaDto) {
  @IsString()
  id: string;
}
