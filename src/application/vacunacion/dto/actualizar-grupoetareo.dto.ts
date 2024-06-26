import { PartialType } from '@nestjs/swagger';
import { CrearGrupoetareoDto } from './crear-grupoetareo.dto';
import { IsString } from 'class-validator';

export class ActualizarGrupoetareoDto extends PartialType(CrearGrupoetareoDto) {
  @IsString()
  id: string;
}
