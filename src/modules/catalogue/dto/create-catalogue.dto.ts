import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCatalogueDto {
  /*  @ApiProperty()
  @IsString()
  uid: string;
*/
  @ApiProperty()
  @IsNumber()
  catalogo_id: number;

  @ApiProperty()
  @IsString()
  descripcion: string;

  @ApiProperty()
  @IsString()
  tablaId: string;
}
