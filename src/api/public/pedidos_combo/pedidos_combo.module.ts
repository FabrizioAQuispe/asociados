import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/api/prisma-service.service';
import { JwtMethods } from 'src/utils/guards/gentoken.service';
import { PedidosComboController } from './pedidos_combo.controller';
import { PedidosComboService } from './pedidos_combo.service';

@Module({
    imports: [],
    providers: [PrismaService,JwtService,JwtMethods,PedidosComboService],
    controllers: [PedidosComboController]
})
export class PedidosComboModule {}
