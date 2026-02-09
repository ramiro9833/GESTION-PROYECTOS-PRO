import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @UseGuards(AuthGuard('jwt')) // Esto hace que la ruta sea privada
  @Get('catalogo')
  getCatalogo(@Request() req) {
    return {
      message: 'Bienvenido al catálogo privado',
      user: req.user, // Aquí verás los datos del token
    };
  }
}
