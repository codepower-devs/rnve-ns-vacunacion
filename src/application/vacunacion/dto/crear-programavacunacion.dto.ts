import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from '@/common/validation';
import { MaxLength } from 'class-validator';

export class CrearProgramaVacunacionDto {
  @ApiProperty({ example: 'Esquema Regular' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100, {
    message: 'Tamano maximo del campo es 100 caracteres',
  })
  descripcion: string;

  @ApiProperty({ example: 'true o false' })
  @IsBoolean()
  esEsquemaRegular: boolean;

  @ApiProperty({ example: '2020-05-09' })
  @IsNotEmpty()
  fechaAplicacion: Date;

  @ApiProperty({ example: '1 es activo, 2 es inactivo ' })
  @IsNumber()
  estadoId?: number;

  @ApiProperty({ example: '1' })
  @IsNumber()
  usuarioId?: number;
}
