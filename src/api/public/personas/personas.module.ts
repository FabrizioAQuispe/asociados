import { Module } from '@nestjs/common';
import { PersonasService } from './personas.service';
import { PersonasController } from './personas.controller';
import { PrismaService } from 'src/api/prisma-service.service';
import { JwtService } from '@nestjs/jwt';
import { JwtMethods } from 'src/utils/guards/gentoken.service';

@Module({
  providers: [PersonasService,PrismaService,JwtService,JwtMethods],
  controllers: [PersonasController]
})
export class PersonasModule {}
