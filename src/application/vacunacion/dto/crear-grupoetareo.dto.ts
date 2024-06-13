import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from '@/common/validation';

export class CrearGrupoetareoDto {
  @ApiProperty({ example: 'Descripción' })
  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @ApiProperty({ example: '54' })
  @IsNumber()
  periodoTiempoId: number;

  @ApiProperty({ example: 'Dias' })
  @IsNotEmpty()
  descripcionPeriodoTiempo: string;

  @ApiProperty({ example: '1' })
  @IsNumber()
  edadInicial: number;

  @ApiProperty({ example: '90' })
  @IsNumber()
  edadFinal: number;

  @ApiProperty({ example: '33' })
  @IsNumber()
  generoAplicaId: number;

  @ApiProperty({ example: 'Mujer' })
  @IsNotEmpty()
  descripcionGeneroAplica: string;

  @ApiProperty({ example: '1 es activo, 2 es inactivo ' })
  @IsNumber()
  estadoId?: number;

  @ApiProperty({ example: 'true o false' })
  @IsBoolean()
  esEsquemaRegular: boolean;
}
