import { Body, Controller, Get, Post,Request, UseGuards } from '@nestjs/common';
import { DataAdminDTO, DataAsociatedDTO, LoginAdminDTO, LoginAsociatedDTO } from 'src/api/models/UserDTO';
import { AsociadosService } from './asociados.service';
import { JwtAuthGuard } from 'src/utils/jwt/jwt.service';
import { Request as ExpressRequest } from 'express'; // Importación correcta de Request

@Controller('asociados')
export class AsociadosController {
    constructor(
        private asociados:AsociadosService
    ){}

}
