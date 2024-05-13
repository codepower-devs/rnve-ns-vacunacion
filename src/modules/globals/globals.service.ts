import { Injectable } from '@nestjs/common';
import { Global } from './entities/global.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GlobalsService {
  constructor(
    @InjectRepository(Global)
    private readonly globalsService: GlobalsService,
  ) {}

  async findAll() {
    try {
      return await this.globalsService.findAll();
    } catch (error) {
      this.handlerErrors(error);
    }
  }

  handlerErrors(error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}
