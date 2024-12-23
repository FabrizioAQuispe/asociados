import { Module } from '@nestjs/common';
import { PagosController } from './pagos.controller';
import { PagosService } from './pagos.service';
import { PrismaService } from 'src/api/prisma-service.service';
import { JwtMethods } from 'src/utils/guards/gentoken.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [],
  controllers: [PagosController],
  providers: [PagosService,PrismaService,JwtMethods,JwtService]
})
export class PagosModule {}
