import { Module } from '@nestjs/common';
import { AsociadosService } from './asociados.service';
import { AsociadosController } from './asociados.controller';
import { PrismaService } from 'src/api/prisma-service.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtMethods } from 'src/utils/guards/gentoken.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'ESTA_ES_MI_CLAVE_SECRETA',
      signOptions: { expiresIn: '72d' },
    })
  ],
  providers: [AsociadosService,PrismaService,JwtService,JwtMethods],
  controllers: [AsociadosController]
})
export class AsociadosModule {}
