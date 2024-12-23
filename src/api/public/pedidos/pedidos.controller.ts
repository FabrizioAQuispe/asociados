import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { PedidosDTO, ResponseList } from 'src/api/models/PedidosDTO';

@Controller('pedidos')
export class PedidosController {
    constructor(
        private pedidos:PedidosService
    ){}

    @Get('/list')
    async getVpedidos():Promise<ResponseList>{
        return await this.pedidos.getVpedidos();
    }

    @Get('/listpedidos')
    async listPedidosEventos(){
        const response = await this.pedidos.listPedidosEventos();
        console.log(response)
        return response;
    }

    @Post('/create')
    async createPedidos(@Body() pedidos:PedidosDTO){
        return await this.pedidos.createPedidos(pedidos)
    }

    @Put('/update/:id_ped')
    async updatePedidos(@Param('id_ped') id_ped:number,@Body() pedidos:PedidosDTO): Promise<ResponseList>{
        return await this.pedidos.updatePedidos(id_ped,pedidos)
    }

    @Put('/estado/:id_ped')
    async deletePedidos(@Param('id_ped') id_ped:number){
        return await this.pedidos.deletePedidos(id_ped);
    }
}
