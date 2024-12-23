import { Injectable } from '@nestjs/common';
import { response } from 'express';
import { resolve } from 'path';
import { EventPedidosList, PedidosDTO, ResponseList } from 'src/api/models/PedidosDTO';
import { PrismaService } from 'src/api/prisma-service.service';

@Injectable()
export class PedidosService {
    constructor(
        private prisma: PrismaService
    ) { }


    


    async listPedidosEventos(): Promise<EventPedidosList[]> {
        try {
            // Especificamos explícitamente que esperamos un arreglo de objetos
            const response = await this.prisma.$queryRawUnsafe<any[]>(`
                CALL acbt.list_pedidos()
            `);
            

    
            // Mapear la respuesta para adaptarla a la interfaz
            const result: EventPedidosList[] = response.map((item: any) => ({
                cd_event: item.f0,   // Asumiendo que f0 es cd_event
                id: item.f1,         // Asumiendo que f1 es id
                NoIdentidad: item.f2, // Asumiendo que f2 es NoIdentidad
                RazonSocial: item.f3, // Asumiendo que f3 es RazonSocial
                Evento: item.f4,     // Asumiendo que f4 es Evento
                FEvento: new Date(item.f5), // Asumiendo que f5 es FEvento y lo convertimos a Date
                estado : item.f6,
                monto: item.f7       // Asumiendo que f6 es monto,
            }));
    
            return result;
    
        } catch (error) {
            throw new Error('ERROR LIST PEDIDOS EVENTOS SERVICE: ' + error.message);
        }
    }

    async getVpedidos(): Promise<ResponseList> {
        try {
            const response = await this.prisma.v_pedidos.findMany({
                include: {
                    v_pedidos_det: {
                        include:{
                            v_eventos:true
                        }
                    }
                },
            })
            if (!response) {
                throw new Error('NOT FOUND PEDIDOS');
            }

            const result: ResponseList = {
                code: 200,
                message: 'SE ENCONTRARON PEDIDOS',
                data: response
            }


            return result
        } catch (error) {
            throw new Error('ERROR V_PEDIDOS SERVICE: ' + error.message);
        }
    }

    async createPedidos(pedidos: PedidosDTO) {
        try {
            const response = await this.prisma.v_pedidos.create({
                data: pedidos,
                include: {
                    v_pedidos_det: true
                }
            });

            if (!response) {
                throw new Error('ERROR TO CREATE PEDIDO')
            }

            return response;
        } catch (error) {
            throw new Error('ERROR SERVICE CREATE PEDIDOS SERVICE' + error.message);
        }
    }

    async updatePedidos(id_ped: number, pedidos: PedidosDTO): Promise<ResponseList> {
        try {
            const pedidoId = await this.prisma.v_pedidos.findFirst({
                where: {
                    id_ped: Number(id_ped),

                }
            })

            if (!pedidoId) {
                throw new Error('NOT FOUND PEDIDO ID');
            }

            const response = await this.prisma.v_pedidos.update({
                where: {
                    id_ped: Number(pedidoId)
                },
                data: pedidos
            })

            if (!response) {
                throw new Error('ERROR AL ACTUALIZAR PEDIDO');
            }

            const result: ResponseList = {
                code: 201,
                message: 'SE ACTUALIZO CON EXITO',
            }

            return result;

        } catch (error) {
            throw new Error('ERROR UPDATE SERVICE PEDIDO: ' + error.message)
        }
    }

    async deletePedidos(id_ped:number){
        try {
            const pedidoId = await this.prisma.v_pedidos.findFirst({
                where:{
                    id_ped: Number(id_ped)
                }
            })

            if(!pedidoId.id_ped){
                throw new Error('ERRO NOT FOUND: '+ pedidoId.id_ped);
            }

            const estadPagado = await this.prisma.v_pedidos.update({
                where:{
                    id_ped:Number(id_ped)
                },
                data:{
                    est_ped: "2"
                }
            })

            const estadAnulado = await this.prisma.v_pedidos.update({
                where:{
                    id_ped:Number(id_ped)
                },
                data:{
                    est_ped: "0"
                }
            })

        } catch (error) {
            throw new Error('ERROR DELETE SERVICE PEDIDOS: ' + error.message );
        }
    }

}
