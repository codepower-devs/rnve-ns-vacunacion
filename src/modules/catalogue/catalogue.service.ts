import { Repository } from 'typeorm';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Catalogue } from './entities/catalogue.entity';
import { CreateCatalogueDto, UpdateCatalogueDto } from './dto';

@Injectable()
export class CatalogueService {
  constructor(
    @InjectRepository(Catalogue)
    private catalogueRepository: Repository<Catalogue>,
  ) {}

  async create(createCatalogueDto: CreateCatalogueDto): Promise<Catalogue> {
    try {
      const catalogue = this.catalogueRepository.create({
        ...createCatalogueDto,
        tabla: { id: createCatalogueDto.tablaId },
      });
      return await this.catalogueRepository.save(catalogue);
    } catch (error) {
      this.handlerErrors(error);
    }
  }

  findAll(): Promise<Catalogue[]> {
    return this.catalogueRepository.find({
      relations: ['tabla'],
    });
  }

  async findOne(id: number): Promise<Catalogue> {
    const catalogue = await this.catalogueRepository.findOne({ where: { id } });
    if (!catalogue) {
      throw new NotFoundException('Registro no encontrado');
    }
    return catalogue;
  }

  async update(
    id: number,
    updateCatalogueDto: UpdateCatalogueDto,
  ): Promise<Catalogue> {
    try {
      const catalogue = await this.findOne(id);
      this.catalogueRepository.merge(catalogue, {
        ...updateCatalogueDto,
        tabla: { id: updateCatalogueDto.tablaId },
      });
      return await this.catalogueRepository.save(catalogue);
    } catch (error) {
      this.handlerErrors(error);
    }
  }

  async inhabilitar(id: number): Promise<void> {
    const table = await this.findOne(id);
    table.estado = false;
    await this.catalogueRepository.save(table);
  }

  async habilitar(id: number): Promise<void> {
    const table = await this.findOne(id);
    table.estado = true;
    await this.catalogueRepository.save(table);
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
