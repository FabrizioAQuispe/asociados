import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { EventosService } from './eventos.service';
import { EventosDTO } from 'src/api/models/EventosDTO';
import { retry } from 'rxjs';

@Controller('eventos')
export class EventosController {
    constructor(
        private eventos:EventosService
    ){}

    
    @Get('/search/:cd_event')
    async getEventoCodigo(@Param('cd_event') cd_event:string){
        return await this.eventos.getEventoCodigo(cd_event);
    }

    @Get('/parametros')
    async getParametros(){
        return await this.eventos.getParametros();
    }



    @Get('/list')
    async getEventos(){
        return await this.eventos.getEventos();
    }

    @Post('/create')
    async createEventos(@Body() eventos:EventosDTO){
        return await this.eventos.createEventos(eventos);
    }

    @Put('/update/:ideve')
    async updateEventos(@Param('ideve') ideve:number,@Body() eventos:EventosDTO){
        return await this.eventos.updateEventos(ideve,eventos)
    }
}

