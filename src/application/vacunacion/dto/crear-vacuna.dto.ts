import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from '@/common/validation';

export class CrearVacunaDto {
  @ApiProperty({ example: 'BCG' })
  @IsNotEmpty()
  @IsString()
  vacuna: string;

  @ApiProperty({ example: 'Tuberculosis miliar y meníngea' })
  @IsNotEmpty()
  enfermedadesPreviene: string;

  @ApiProperty({ example: 'Intradermica' })
  @IsNotEmpty()
  via: string;

  @ApiProperty({ example: '1 es activo, 2 es inactivo ' })
  @IsNumber()
  estadoId?: number;
}
