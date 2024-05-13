import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GlobalsService } from './globals.service';

@ApiTags('globals')
@Controller('globals')
export class GlobalsController {
  constructor(private readonly globalsService: GlobalsService) {}

  @Get()
  findAll(): Promise<any> {
    return this.globalsService.findAll();
  }
}
