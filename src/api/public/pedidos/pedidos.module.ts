import { Module } from '@nestjs/common';
import { PedidosController } from './pedidos.controller';
import { PedidosService } from './pedidos.service';
import { PrismaService } from 'src/api/prisma-service.service';
import { JwtMethods } from 'src/utils/guards/gentoken.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [PedidosController],
  providers: [PedidosService,PrismaService,JwtMethods,JwtService ]
})
export class PedidosModule {}
