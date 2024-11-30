import { Module } from '@nestjs/common';
import { EventosService } from './eventos.service';
import { EventosController } from './eventos.controller';
import { PrismaService } from 'src/api/prisma-service.service';
import { JwtMethods } from 'src/utils/guards/gentoken.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [EventosService,PrismaService,JwtMethods,JwtService],
  controllers: [EventosController]
})
export class EventosModule {}
