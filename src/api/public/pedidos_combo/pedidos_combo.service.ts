import { Injectable } from '@nestjs/common';
import { PedidosComboDTO } from 'src/api/models/PedidosDTO';
import { PrismaService } from 'src/api/prisma-service.service';

@Injectable()
export class PedidosComboService {
    constructor(
        private prisma:PrismaService
    ){}


    async getPedidosCombo(){
        try {
            const response = await this.prisma.v_pedidos_combo.findMany();
            if(!response){
                throw new Error('ERROR NOT FOUND RESPONSE PEDIDOS');
            }

            return response;
        } catch (error) {
            throw new Error('ERROR GET PEDIDOS SERVICE: ' + error.message);
        }
    }

    async createPedidosCombo(eventosPedidoCombo:PedidosComboDTO){
        try {
            const response = await this.prisma.v_pedidos_combo.create({
                data: eventosPedidoCombo
            })

            if(!response){
                throw new Error('ERROR NOT FOUND RESPONSE CREATE PEDIDOS COMBO');
            }

            return response;
        } catch (error) {
            throw new Error('ERROR CREATE PEDIDOS COMBO SERVICE CREATE: ' + error.message);
        }
    }

    async updatePedidosCombo(id_pedcombo:number, pedidosCombo:PedidosComboDTO){
        try {
            const pedidoId = await this.prisma.v_pedidos_combo.findFirst({
                where:{
                    idpedcombo: Number(id_pedcombo)
                }
            })

            if(pedidoId.idpedcombo){
                throw new Error('ERROR NOT FOUND ID PEDIDO: ' + pedidoId.idpedcombo);
            }

            const response = await this.prisma.v_pedidos_combo.update({
                where:{
                    idpedcombo: Number(pedidoId.idpedcombo)
                },
                data:pedidosCombo
            })

            if(!response){
                throw new Error('ERROR UPDATE ID PEDIDO: ' + pedidoId.idpedcombo);
            }

            return response
        } catch (error) {
            throw new Error('ERROR UPDATE PEDIDOS COMBO SERVICE: ' + error.message);
        }
    }

    async deletePedidosCombo(idpedidosCombo:number){
        try {
            const pedidoId = await this.prisma.v_pedidos_combo.findFirst({
                where:{
                    idpedcombo:Number(idpedidosCombo)
                }
            })

            if(pedidoId.idpedcombo){
                throw new Error('ERRO NOT FOUND: ' + pedidoId.idpedcombo);
            }

            const response = await this.prisma.v_pedidos_combo.delete({
                where:{
                    idpedcombo: Number(pedidoId.idpedcombo)
                }
            })

            if(!response){
                throw new Error('ERROR RESPONSE DELTE SERVICE')
            }

            return response;
        } catch (error) {
            throw new Error('ERROR DELETE PEDIDO COMBO SERVICE: ' + error.message);
        }
    }
}
