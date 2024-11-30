import { Injectable } from '@nestjs/common';
import { PedidosDTO, ResponseList } from 'src/api/models/PedidosDTO';
import { PrismaService } from 'src/api/prisma-service.service';

@Injectable()
export class PedidosService {
    constructor(
        private prisma:PrismaService
    ){}

    async getVpedidos() : Promise<ResponseList>{
        try {
            const response = await this.prisma.v_pedidos.findMany({
                include:{
                    v_pedidos_det:true
                },
            })
            if(!response){
                throw new Error('NOT FOUND PEDIDOS');
            }

            const result:ResponseList = {
                code: 200,
                message: 'SE ENCONTRARON PEDIDOS',
                data: response
            }


            return result
        } catch (error) {
            throw new Error('ERROR V_PEDIDOS SERVICE: ' + error.message);
        }
    }

    async createPedidos(pedidos:PedidosDTO){
        try {
            const response = await this.prisma.v_pedidos.create({
                data: pedidos
            });

            if(!response){
                throw new Error('ERROR TO CREATE PEDIDO')
            }

            return response;
        } catch (error) {
            throw new Error('ERROR SERVICE CREATE PEDIDOS SERVICE' + error.message);
        }
    }

    async updatePedidos(id_ped:number,pedidos:PedidosDTO): Promise<ResponseList>{
        try {
            const pedidoId = await this.prisma.v_pedidos.findFirst({
                where: {
                    id_ped: Number(id_ped)
                }
            })

            if(!pedidoId){
                throw new Error('NOT FOUND PEDIDO ID');
            }

            const response = await this.prisma.v_pedidos.update({
                where:{
                    id_ped: Number(pedidoId)
                },
                data: pedidos
            })

            if(!response){
                throw new Error('ERROR AL ACTUALIZAR PEDIDO');
            }

            const result:ResponseList = {
                code: 201,
                message: 'SE ACTUALIZO CON EXITO',
            }

            return result;

        } catch (error) {
            throw new Error('ERROR UPDATE SERVICE PEDIDO: ' + error.message)
        }
    }

}
