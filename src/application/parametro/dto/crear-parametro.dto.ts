import { IsNotEmpty, IsOptional } from '@/common/validation';

export class CrearParametroDto {
  @IsNotEmpty()
  codigo: string;

  @IsNotEmpty()
  nombre: string;

  @IsNotEmpty()
  grupo: string;

  @IsNotEmpty()
  descripcion: string;

  @IsOptional()
  estado?: string;

  usuarioCreacion: string;
}

export class RespuestaCrearParametroDto {
  @IsNotEmpty()
  id: string;
}
