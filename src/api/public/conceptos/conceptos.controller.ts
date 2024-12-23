import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ConceptosService } from './conceptos.service';
import { ConceptoDetalleDTO, ConceptoDTO } from 'src/api/models/ConceptoDTO';

@Controller('conceptos')
export class ConceptosController {
    constructor(
        private concepto:ConceptosService
    ){}

    @Get('/list/:tip_conc')
    async getConceptos(@Param('tip_conc') tip_conc:number){
        const response = await this.concepto.getConceptos(tip_conc);
        console.log(tip_conc)
        return response
    }

    @Get('/list')
    async getConceptosWithParametros(){
        return await this.concepto.getConceptosWithParametros();
    }

    @Get('/parametros/:cd_parametro')
    async getParametros(@Param('cd_parametro') cd_parametro:string){
        return await this.concepto.getParametros(cd_parametro);
    }

    //Metodos Post
    @Post('/create')
    async createConcepto(@Body() concepto:ConceptoDTO){
        return await this.concepto.createConcepto(concepto);
    }

    @Post('/create/detalle')
    async createConceptoDetalle(@Body() concepto:ConceptoDetalleDTO){
        return await this.concepto.createConceptoDetalle(concepto);
    }

}
