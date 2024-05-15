import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateTableDto, UpdateTableDto } from './dto';
import { Table } from './entities/table.entity';

@Injectable()
export class TablesService {
  constructor(
    @InjectRepository(Table)
    private tableRepository: Repository<Table>,
  ) {}

  async create(createTableDto: CreateTableDto): Promise<Table> {
    try {
      const table = this.tableRepository.create(createTableDto);
      return await this.tableRepository.save(table);
    } catch (error) {
      this.handlerErrors(error);
    }
  }

  async findAll(): Promise<Table[]> {
    return await this.tableRepository.find();
  }

  async findOne(id: string): Promise<Table> {
    const table = await this.tableRepository.findOne({ where: { id } });

    if (!table) {
      throw new NotFoundException('Registro no encontrado');
    }

    return table;
  }

  async update(id: string, updateTableDto: UpdateTableDto): Promise<Table> {
    try {
      const table = await this.findOne(id);
      this.tableRepository.merge(table, updateTableDto);
      return await this.tableRepository.save(table);
    } catch (error) {
      this.handlerErrors(error);
    }
  }

  async inhabilitar(id: string): Promise<void> {
    const table = await this.findOne(id);
    table.estado = false;
    await this.tableRepository.save(table);
  }

  async habilitar(id: string): Promise<void> {
    const table = await this.findOne(id);
    table.estado = true;
    await this.tableRepository.save(table);
  }

  handlerErrors(error: any) {
    if (error.code === '23505') {
      throw new InternalServerErrorException('Registro duplicado');
    }

    if (error.code === '22P02') {
      throw new NotFoundException('registro no existe');
    }
    throw new InternalServerErrorException('Error en el servidor');
  }
}
