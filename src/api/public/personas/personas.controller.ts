import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { PersonasService } from './personas.service';
import { PersonasDTO } from 'src/api/models/PersonasDTO';
import { ResponseCreateDTO, ResponseDeleteDTO, ResponseUpdateDTO } from 'src/api/models/ResponsesDTO';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/utils/jwt/jwt.service';

@Controller('personas')
export class PersonasController {
    constructor(
        private personasService:PersonasService
    ){}
    
    @Get('/list')
    async getPersonas(){
        return await this.personasService.getPersonas();
    }

    @Post('/dni')
    async getDatosPersonaDni(@Body() dni:string){
        return await this.personasService.getDatosPersonaDni(dni);
    }
    @Post('/create')
    async createPersonas(@Body() personas:PersonasDTO,@Req() request:Request) : Promise<ResponseCreateDTO>{
        return await this.personasService.createPersonas(personas,request);
    }

    @Put('/update/:id')
    async updatePersonas(@Body() personas:PersonasDTO,@Param('id') persId:number) : Promise<ResponseUpdateDTO>{
        return await this.personasService.updatePersonas(personas,persId);
    }

    @Delete('/delete/:id')
    async deletePersonas(@Param('id') idpers:number,request:Request) : Promise<ResponseDeleteDTO>{
        return await this.personasService.deletePersonas(idpers,request);
    }
}
