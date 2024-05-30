import { ConfigService } from '@nestjs/config';
import { Controller, Get, Inject } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import dayjs from 'dayjs';

import { BaseController } from './common/base';
import packageJson from '../package.json';

@Controller()
@ApiTags('Estado')
export class AppController extends BaseController {
  constructor(@Inject(ConfigService) private configService: ConfigService) {
    super();
  }

  @ApiOperation({ summary: 'API para obtener el estado de la aplicación' })
  @Get('/estado')
  verificarEstado() {
    const now = dayjs();
    return {
      servicio: packageJson.name,
      version: packageJson.version,
      entorno: this.configService.get('NODE_ENV'),
      estado: 'Servicio funcionando correctamente',
      commit_sha: this.configService.get('CI_COMMIT_SHORT_SHA'),
      mensaje: this.configService.get('CI_COMMIT_MESSAGE'),
      branch: this.configService.get('CI_COMMIT_REF_NAME'),
      fecha: now.format('YYYY-MM-DD HH:mm:ss.SSS'),
      hora: now.valueOf(),
    };
  }
}
