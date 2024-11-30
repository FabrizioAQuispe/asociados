import { Injectable } from '@nestjs/common';
import { ConceptoDetalleDTO, ConceptoDTO } from 'src/api/models/ConceptoDTO';
import { PrismaService } from 'src/api/prisma-service.service';

@Injectable()
export class ConceptosService {
    constructor(
        private prisma:PrismaService
    ){}

    //METODOS PARA CREAR CONCEPTOS CON SUS DETALLES
    async createConceptoDetalle(concepto: ConceptoDetalleDTO) {
        try {
            const response = await this.prisma.v_pedidos_det.create({
                data:concepto,
            });
    
            if (!response) {
                throw new Error('ERROR CREATE CONCEPTO');
            }
    
            return response;
        } catch (error) {
            throw new Error('ERROR SERVICE CREATE CONCEPTO: ' + error.message);
        }
    }

    async createConcepto(concepto:ConceptoDTO){
        try {
            const response = await this.prisma.v_concepto.create({
                data: concepto,

            })

            if(!response){
                throw new Error('ERROR CREATE CONCEPTO')
            }

            return response;
        } catch (error) {
            throw new Error('ERROR SERVICE CREATE CONCEPTO: ' + error.message)
        }
    }

    //FIN DE LOS METODOS PARA CREAR LOS CONCEPTOS

    
    //METODOS PARA OBTENER CONCEPTOS CON SUS PARAMETROS
    async getConceptos(tip_conc_det:number){
        console.log(tip_conc_det)
        try {
            const response = await this.prisma.v_concepto.findMany({
                where:{
                    cd_parametro: {
                        contains: tip_conc_det.toString()
                    }
                },
                include:{
                    conceptos_det:true
                },
            });

            if(!response){
                throw new Error('NOT FOUND CONCEPTS');
            }

            return response
        } catch (error) {
            throw new Error('ERROR GET CONCEPTOS SERVICE ERROR' + error.message);
        }
    }

    async getParametros(cd_parametro:string){
        try {
            const response = await this.prisma.parametro.findMany({
                where:{
                    cd_parametro:cd_parametro
                },
                select:{
                    cd_parametro:true,
                    descripcion:true,
                    idparametro:true
                }
            })
            return response;
        } catch (error) {
            throw new Error('ERROR GET PARAMETROS SERVICE');
        }
    }

    async getConceptosWithParametros(){
        try {
            const response = await this.prisma.v_concepto.findMany({
                select:{
                    cd_parametro:true,
                    conceptos_det:true,
                    de_conc:true,
                    est_conc:true,
                    idconc:true,
                    precio:true,
                    tip_conc:true
                }
            })

            return response
        } catch (error) {
            throw new Error('ERROR GET CONCEPTOS SERVICE' + error.message)
        }
    }

}
