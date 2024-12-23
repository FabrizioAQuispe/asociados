import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { PedidosComboService } from './pedidos_combo.service';
import { PedidosComboDTO } from 'src/api/models/PedidosDTO';

@Controller('pedidos-combo')
export class PedidosComboController {
    constructor(
        private pedidosComboService:PedidosComboService
    ){}

    @Get('/list')
    async getPedidosCombo(){
        return await this.pedidosComboService.getPedidosCombo();
    }

    @Post('/create')
    async createPedidosCombo(@Body() eventosPedidoCombo:PedidosComboDTO){
        return await this.pedidosComboService.createPedidosCombo(eventosPedidoCombo);
    }

    @Put('/update/:id')
    async updatePedidosCombo(@Param('id') id_pedcombo:number,@Body() pedidosCombo:PedidosComboDTO){
        return await this.pedidosComboService.updatePedidosCombo(id_pedcombo,pedidosCombo)
    }
}
