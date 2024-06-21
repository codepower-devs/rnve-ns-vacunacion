import { PartialType } from '@nestjs/swagger';
import { CrearVacunaDto } from './crear-vacuna.dto';

export class ActualizarVacunaDto extends PartialType(CrearVacunaDto) {}
