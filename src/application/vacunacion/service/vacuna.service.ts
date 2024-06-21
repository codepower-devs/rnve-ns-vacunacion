import { BaseService } from '@/common/base';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { VacunaRepository } from '../repository/vacuna.repository';
import { CrearVacunaDto } from '../dto/crear-vacuna.dto';
import { ActualizarVacunaDto } from '../dto/actualizar-vacuna.dto';
import { Messages } from '@/common/constants/response-messages';
import { PaginacionQueryDto } from '@/common/dto/paginacion-query.dto';

@Injectable()
export class VacunaService extends BaseService {
  constructor(
    @Inject(VacunaRepository)
    private vacunaRepository: VacunaRepository,
  ) {
    super();
  }

  async listar() {
    return await this.vacunaRepository.listar();
  }

  async listarTodos(paginacionQueryDto: PaginacionQueryDto) {
    return await this.vacunaRepository.listarTodos(paginacionQueryDto);
  }

  async crear(vacunaDto: CrearVacunaDto) {
    return await this.vacunaRepository.crear(vacunaDto);
  }

  async actualizar(id: string, vacunaDto: ActualizarVacunaDto) {
    const vacuna = await this.vacunaRepository.buscarPorId(id);
    if (!vacuna) {
      throw new NotFoundException(Messages.EXCEPTION_NOT_FOUND);
    }
    //console.log(vacunaDto);
    await this.vacunaRepository.actualizar(id, vacunaDto);
    return { id };
  }

  async activar(idVacuna: string) {
    const vacuna = await this.vacunaRepository.buscarPorId(idVacuna);
    if (!vacuna) {
      throw new NotFoundException(Messages.EXCEPTION_NOT_FOUND);
    }

    const vacunaDto = new CrearVacunaDto();
    vacunaDto.estadoId = 1;

    await this.vacunaRepository.actualizar(idVacuna, vacunaDto);
    return { id: idVacuna, estado_id: 1 };
  }

  async inactivar(idVacuna: string) {
    const vacuna = await this.vacunaRepository.buscarPorId(idVacuna);
    if (!vacuna) {
      throw new NotFoundException(Messages.EXCEPTION_NOT_FOUND);
    }

    const vacunaDto = new CrearVacunaDto();
    vacunaDto.estadoId = 2;

    await this.vacunaRepository.actualizar(idVacuna, vacunaDto);
    return { id: idVacuna, estado_id: 2 };
  }
}
