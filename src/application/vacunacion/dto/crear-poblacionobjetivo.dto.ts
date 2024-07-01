import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from '@/common/validation';
import { IsPositive } from 'class-validator';

export class CrearPoblacionObjetivoDto {
  @ApiProperty()
  @IsNumber()
  establecimientoGestionId: number;

  @ApiProperty()
  @IsNumber()
  grupoEtareoId: number;

  @ApiProperty({ example: '5' })
  @IsNumber()
  @IsPositive()
  cantidadMasculino: number;

  @ApiProperty({ example: '7' })
  @IsNumber()
  @IsPositive()
  cantidadFemenino: number;

  @ApiProperty({ example: '5' })
  @IsNumber()
  @IsPositive()
  cantidadMasculinoPai: number;

  @ApiProperty({ example: '7' })
  @IsNumber()
  @IsPositive()
  cantidadFemeninoPai: number;

  @ApiProperty({ example: '1 es activo, 2 es inactivo ' })
  @IsNumber()
  estadoId?: number;
}
