import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TablesService } from './tables.service';
import { CreateTableDto, UpdateTableDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tablas')
@Controller('tablas')
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  @Post()
  create(@Body() createTableDto: CreateTableDto) {
    return this.tablesService.create(createTableDto);
  }

  @Get()
  findAll() {
    return this.tablesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tablesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTableDto: UpdateTableDto) {
    return this.tablesService.update(id, updateTableDto);
  }

  @Delete('inhabilitar/:id')
  inhabilitar(@Param('id') id: string) {
    return this.tablesService.inhabilitar(id);
  }

  @Delete('habilitar/:id')
  habilitar(@Param('id') id: string) {
    return this.tablesService.habilitar(id);
  }
}
