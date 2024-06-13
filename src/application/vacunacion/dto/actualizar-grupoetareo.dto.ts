import { PartialType } from '@nestjs/swagger';
import { CrearGrupoetareoDto } from './crear-grupoetareo.dto';

export class ActualizarGrupoetareoDto extends PartialType(
  CrearGrupoetareoDto,
) {}
