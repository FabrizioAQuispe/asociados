import { Module } from '@nestjs/common';
import { ConceptosController } from './conceptos.controller';
import { ConceptosService } from './conceptos.service';
import { PrismaService } from 'src/api/prisma-service.service';
import { JwtService } from '@nestjs/jwt';
import { JwtMethods } from 'src/utils/guards/gentoken.service';

@Module({
    providers: [ConceptosService,PrismaService,JwtService,JwtMethods],
    controllers: [ConceptosController],
    imports: []
})
export class ConceptosModule {}
