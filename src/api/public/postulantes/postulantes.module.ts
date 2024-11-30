import { Module } from '@nestjs/common';
import { PostulantesService } from './postulantes.service';
import { PostulantesController } from './postulantes.controller';
import { PrismaService } from 'src/api/prisma-service.service';
import { JwtService } from '@nestjs/jwt';
import { JwtMethods } from 'src/utils/guards/gentoken.service';

@Module({
  providers: [PostulantesService,PrismaService,JwtService,JwtMethods],
  controllers: [PostulantesController]
})
export class PostulantesModule {}
