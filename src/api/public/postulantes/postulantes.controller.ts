import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { PostulantesService } from './postulantes.service';
import { Request } from 'express';
import { JwtMethods } from 'src/utils/guards/gentoken.service';

@Controller('postulantes')
export class PostulantesController {
    constructor(
        private postulantes:PostulantesService
    ){}

    @Get('/list')
    @UseGuards(JwtMethods)
    async getPostulantes(@Req() request:Request){
        return await this.postulantes.getPostulantes(request);
    }
}
