import { IsNotEmpty, IsNumber, IsString } from '@/common/validation';
import { ApiProperty } from '@nestjs/swagger';
import { Max } from 'class-validator';

export class CrearEsquemaDto {
  @ApiProperty()
  @IsNumber()
  programavacunacionId?: number;

  @ApiProperty()
  @IsNumber()
  vacunaId?: number;

  @ApiProperty({ example: '6 a 11 meses' })
  @IsNotEmpty()
  @IsString()
  edadCondicion: string;

  @ApiProperty({ example: '54' })
  @IsNumber()
  periodoTiempoId: number;

  @ApiProperty({ example: 'Dias' })
  @IsNotEmpty()
  descripcionPeriodoTiempo: string;

  @ApiProperty({ example: '1ra Dosis' })
  @IsNotEmpty()
  @IsString()
  numeroDeDosis: string;

  @ApiProperty({ example: '0.25 ml' })
  @IsNotEmpty()
  @IsString()
  cantidadDeDosis: string;

  @ApiProperty({
    example:
      'Intramuscular. Tercio medio de la cara antero lateral externa del muslo',
  })
  @IsNotEmpty()
  @IsString()
  viaLugarDeDosis: string;

  @ApiProperty({ example: '3' })
  @IsNumber()
  @Max(31)
  edadMinimaDias: number;

  @ApiProperty({ example: '6' })
  @IsNumber()
  @Max(11)
  edadMinimaMeses: number;

  @ApiProperty({ example: '11' })
  @IsNumber()
  @Max(140)
  edadMinimaAnios: number;

  @ApiProperty({ example: '30' })
  @IsNumber()
  @Max(31)
  edadMaximaDias: number;

  @ApiProperty({ example: '11' })
  @IsNumber()
  @Max(11)
  edadMaximaMeses: number;

  @ApiProperty({ example: '15' })
  @IsNumber()
  @Max(140)
  edadMaximaAnios: number;

  @ApiProperty({ example: '1' })
  @IsNumber()
  ordenDeDosis: number;

  @ApiProperty({ example: '1 es activo, 2 es inactivo ' })
  @IsNumber()
  estadoId?: number;
}
