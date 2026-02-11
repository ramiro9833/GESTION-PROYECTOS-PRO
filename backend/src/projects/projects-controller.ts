import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('projects')
export class ProjectsController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async create(@Body() data: { name: string, description: string, priority: any, ownerId: string }) {
    return this.prisma.project.create({
      data: {
        name: data.name,
        description: data.description,
        ownerId: data.ownerId, // El ID tipo String (CUID)
        // Agregamos un requerimiento inicial por defecto para simular datos
        requirements: {
          create: {
            title: 'Configuración inicial',
            description: 'Definición de arquitectura del proyecto',
            priority: data.priority
          }
        }
      }
    });
  }

  @Get('user/:userId')
  async findAllByUser(@Param('userId') userId: string) {
    return this.prisma.project.findMany({
      where: { ownerId: userId },
      include: { _count: { select: { requirements: true } } }
    });
  }
}