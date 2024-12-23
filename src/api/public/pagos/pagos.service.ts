import { Injectable } from '@nestjs/common';
import { DepositosDTO } from 'src/api/models/DepositosDTO';
import { Pagos, PagosCondicion, RegistrarPago } from 'src/api/models/PagoDTO';
import { PrismaService } from 'src/api/prisma-service.service';

@Injectable()
export class PagosService {
    constructor(
        private prisma: PrismaService
    ) { }

    async metodosPagos() {
        try {
            const response = await this.prisma.variable.findMany({
                where: {
                    concepto: "COND_PAGO"
                }
            });

            if (!response) {
                throw new Error('ERROR RESPONSE METODOS PAGOS');
            }


            return response;
        } catch (error) {
            throw new Error('ERROR METODOS PAGOS LIST SERVICE: ' + error.message);
        }
    }

    async pagosListPedidos() {
        try {
            const response = await this.prisma.v_pedidos.findMany({

                include: {
                    v_pedidos_det: {
                        include: {
                            v_concepto: {
                                select: {
                                    idconc: true,
                                    de_conc: true,
                                    precio: true,
                                }
                            },
                            v_eventos: {
                                select: {
                                    f_event: true,
                                    nom_event: true
                                }
                            },
                        },

                    },
                    personas: {
                        select: {
                            idpers: true,
                            dni: true,
                            ape_mat: true,
                            ape_pat: true,
                            nom: true
                        }
                    }
                }
            });

            return response;
        } catch (error) {
            throw new Error('ERROR LIST PEDIDOS EVENTOS SERVICE: ' + error.message);
        }
    }


    async createPagoPedido(data: RegistrarPago) {
        try {
            const response = await this.prisma.v_pedidos.create({
                data: {
                    id_pers: data.id_pers, // Debes pasar el id_pers válido que corresponde a una persona
                    monto: data.monto,
                    est_ped: data.est_ped,
                    f_regi: data.f_regi,
                    f_act: data.f_act,
                    userId: data.userId,
                    v_pedidos_det: {
                        create: data.v_pedidos_det.map(detalle => ({
                            idconc: detalle.idconc,
                            cantidad: detalle.cantidad,
                            monto: detalle.monto,
                            v_concepto: {
                                connect: {
                                    idconc: detalle.idconc
                                }
                            },
                            v_eventos: {
                                connect: {
                                    cd_event: detalle.cd_event
                                }
                            }
                        }))
                    }
                },
                include: {
                    v_pedidos_det: {
                        include: {
                            v_concepto: true,
                            v_eventos: true
                        }
                    },
                    personas: true
                }
            });

            return response;
        } catch (error) {
            throw new Error('Error al crear el pedido: ' + error.message);
        }
    }


    async getPagos() {
        try {
            const pagos = await this.prisma.t_pago.findMany();
            return pagos;
        } catch (error) {
            throw new Error('ERROR GET PAGOS SERVICCE: ' + error.message);
        }
    }
    async createPagoCondicion(pagosCondicion: PagosCondicion) {
        try {
            const response = await this.prisma.t_pago_cond.create({
                data: pagosCondicion
            })
            return response;
        } catch (error) {
            throw new Error('ERROR CREATE PAGOS CONDICION SERVICE: ' + error.message);
        }
    }

    //Pagos Funcional :3
    async createPagos(pagosDTO: Pagos) {
        try {
            const now = new Date();
            const year = now.getFullYear().toString();
            const month = (now.getMonth() + 1).toString().padStart(2,'0');

            const tPagosFull = await this.prisma.t_pago.findFirst({
                where:{
                    cd_pago: {
                        contains: year + month
                    }
                }
            })

            let cd_pago = year + month + '0001';

            if(tPagosFull){
                cd_pago = (Number(tPagosFull.cd_pago) + 1).toString();
            }

            const dataPagos = {
                ...pagosDTO,
                cd_pago
            }

            console.log(dataPagos)

            const response = await this.prisma.t_pago.create({
                data: dataPagos,
            });


            const estadActivado = await this.prisma.v_pedidos.update({
                where: {
                    id_ped: Number(response.id_ped)
                },
                data: {
                    est_ped: "2"
                }
            });

            if (!response.cd_pago) {
                throw new Error('EL CODIGO DE PAGO ES INCORRECTO O NO EXISTE');
            }

            return response;
        } catch (error) {
            throw new Error('ERROR CREATE PAGOS SERVICE: ' + error.message);
        }
    }

    async updatePagos(idPago: number, pagos: Pagos) {
        try {
            const result = await this.prisma.t_pago.findFirst({
                where: {
                    idPago: Number(idPago)
                },
            });

            if (!result.idPago) {
                throw new Error('ERROR ID NOT FOUND');
            }

            const response = await this.prisma.t_pago.update({
                where: {
                    idPago: Number(idPago)
                },
                data: pagos
            })

            if (!response) {
                throw new Error('ERROR RESPONSE FETCH DATA');
            }

            return response;
        } catch (error) {
            throw new Error('ERROR UPDATE PAGOS: ' + error.message);
        }
    }

    async deletePagos(idPago: number) {
        try {
            const userId = await this.prisma.t_pago.findFirst({
                where: {
                    idPago: Number(idPago)
                }
            });

            if (!userId.idPago) {
                throw new Error('ERROR ID NOT FOUND');
            }

            const response = await this.prisma.t_pago.delete({
                where: {
                    idPago: Number(userId.idPago)
                }
            });

            return response
        } catch (error) {
            throw new Error('ERROR DELETE PAGOS SERVICE: ' + error.message);
        }
    }
}
