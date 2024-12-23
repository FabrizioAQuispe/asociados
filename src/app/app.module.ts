import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from 'src/api/prisma-service.service';
import { AsociadosModule } from 'src/api/admin/asociados/asociados.module';
import { AsociadosController } from 'src/api/admin/asociados/asociados.controller';
import { AsociadosService } from 'src/api/admin/asociados/asociados.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtMethods } from 'src/utils/guards/gentoken.service';
import { LoginModule } from 'src/api/admin/login/login.module';
import { LoginModules } from 'src/api/public/logins/login.module';
import { LoginController } from 'src/api/admin/login/login.controller';
import { LoginService } from 'src/api/admin/login/login.service';
import { PersonasController } from 'src/api/public/personas/personas.controller';
import { PersonasService } from 'src/api/public/personas/personas.service';
import { PersonasModule } from 'src/api/public/personas/personas.module';
import { PostulantesModule } from 'src/api/public/postulantes/postulantes.module';
import { PostulantesController } from 'src/api/public/postulantes/postulantes.controller';
import { PostulantesService } from 'src/api/public/postulantes/postulantes.service';
import { EventosModule } from 'src/api/public/eventos/eventos.module';
import { EventosController } from 'src/api/public/eventos/eventos.controller';
import { EventosService } from 'src/api/public/eventos/eventos.service';
import { ConceptosModule } from 'src/api/public/conceptos/conceptos.module';
import { ConceptosController } from 'src/api/public/conceptos/conceptos.controller';
import { ConceptosService } from 'src/api/public/conceptos/conceptos.service';
import { PedidosModule } from 'src/api/public/pedidos/pedidos.module';
import { PedidosController } from 'src/api/public/pedidos/pedidos.controller';
import { PedidosService } from 'src/api/public/pedidos/pedidos.service';
import { PedidosComboModule } from 'src/api/public/pedidos_combo/pedidos_combo.module';
import { PedidosComboController } from 'src/api/public/pedidos_combo/pedidos_combo.controller';
import { PedidosComboService } from 'src/api/public/pedidos_combo/pedidos_combo.service';
import { PagosModule } from 'src/api/public/pagos/pagos.module';
import { PagosController } from 'src/api/public/pagos/pagos.controller';
import { PagosService } from 'src/api/public/pagos/pagos.service';

@Module({
  imports: [
    EventosModule,
    LoginModule,
    AsociadosModule,
    PersonasModule,
    PostulantesModule,
    ConceptosModule,
    PedidosModule,
    PedidosComboModule,
    PagosModule,
    LoginModules,
    JwtModule.register({
      secret: 'ESTA_ES_MI_CLAVE_SECRETA',
      signOptions: { expiresIn: '72d' },
    })
  ],
  controllers: [AppController,AsociadosController,LoginController,PersonasController,PostulantesController,EventosController,ConceptosController,PedidosController,PedidosComboController,PagosController,LoginController],
  providers: [AppService,PrismaService,AsociadosService,JwtService,JwtMethods,LoginService,PersonasService,PostulantesService,EventosService,ConceptosService,PedidosService,PedidosComboService,PagosService,LoginService],
})    
export class AppModule {}
