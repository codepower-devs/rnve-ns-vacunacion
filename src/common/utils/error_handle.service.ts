import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class ErrorHandlingService {
  handlerErrors(error: any, service: string): void {
    //console.log(error);
    // Agrega el guardado en el servicio de logs
    // this.logsRepository(error.code, error.message, service);
    console.log('Error en el sevicio: ' + service);

    switch (error.code) {
      case '23505':
        throw new HttpException(
          'Registro duplicado',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      case '22P02':
        throw new HttpException('Registro no existe', HttpStatus.NOT_FOUND);
      default:
        throw new HttpException(
          'Error en el servidor',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }
}
