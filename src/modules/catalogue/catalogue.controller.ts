import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CatalogueService } from './catalogue.service';
import { CreateCatalogueDto } from './dto/create-catalogue.dto';
import { UpdateCatalogueDto } from './dto/update-catalogue.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Catalogos')
@Controller('catalogos')
export class CatalogueController {
  constructor(private readonly catalogueService: CatalogueService) {}

  @Post()
  create(@Body() createCatalogueDto: CreateCatalogueDto) {
    return this.catalogueService.create(createCatalogueDto);
  }

  @Get()
  findAll() {
    return this.catalogueService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catalogueService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCatalogueDto: UpdateCatalogueDto,
  ) {
    return this.catalogueService.update(+id, updateCatalogueDto);
  }

  @Delete('inhabilitar/:id')
  inhabilitar(@Param('id') id: string) {
    return this.catalogueService.inhabilitar(+id);
  }

  @Delete('habilitar/:id')
  habilitar(@Param('id') id: string) {
    return this.catalogueService.habilitar(+id);
  }
}
