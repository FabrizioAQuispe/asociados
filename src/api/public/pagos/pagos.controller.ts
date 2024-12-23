import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PagosService } from './pagos.service';
import { Pagos, PagosCondicion, RegistrarPago } from 'src/api/models/PagoDTO';
import { DepositosDTO } from 'src/api/models/DepositosDTO';

@Controller('pagos')
export class PagosController {
    constructor(
        private pagosService: PagosService
    ) { }

    @Get('/list')
    async getPagos() {
        return await this.pagosService.getPagos();
    }

    @Get('/pendientes')
    async pagosListPedidos() {
        return await this.pagosService.pagosListPedidos();
    }

    @Get('/metodos-list')
    async metodosPagos() {
        return await this.pagosService.metodosPagos();
    }

    @Post('/registrar-pago')
    async createPagoPedido(@Body() data: RegistrarPago) {
        return await this.pagosService.createPagoPedido(data);
    }

    @Post('/create')
    async createPagos(@Body() pagosDTO: Pagos) {
        const response = await this.pagosService.createPagos(pagosDTO);
        return response;
    }

    @Post('/create/pago-cond')
    async createPagoCondicion(@Body() pagosCondicion: PagosCondicion) {
        return await this.pagosService.createPagoCondicion(pagosCondicion);
    }

    @Put('/update/:id')
    async updatePagos(@Param('id') idPago: number, @Body() pagos: Pagos) {
        return await this.pagosService.updatePagos(idPago, pagos);
    }

    @Delete('/delete/:id')
    async deletePagos(@Param('id') idPago: number) {
        return await this.pagosService.deletePagos(idPago);
    }

}
