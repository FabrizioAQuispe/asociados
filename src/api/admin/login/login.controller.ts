import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { DataAdminDTO, DataAsociatedDTO, LoginAdminDTO, LoginAsociatedDTO, LoginPersonasDTO } from 'src/api/models/UserDTO';
import { LoginService } from './login.service';
import { JwtAuthGuard } from 'src/utils/jwt/jwt.service';
import { JwtMethods } from 'src/utils/guards/gentoken.service';
import { PersonasDTO } from 'src/api/models/PersonasDTO';

@Controller('auth')
export class LoginController {
    constructor(
        private asociados:LoginService
    ){}
    @Post('/login/admin')
    async loginAdmin(@Body()loginAsociated: LoginAdminDTO): Promise<DataAdminDTO> {
        return await this.asociados.loginAdmin(loginAsociated);
    }

    @Post('/login/socio')
    async loginSocio(@Body()loginSoc: LoginAsociatedDTO) : Promise<DataAsociatedDTO>{
        return await this.asociados.loginSocio(loginSoc);
    }

    @Post('/login/personas')
    async loginPersonas(@Body()loginPersonas: LoginPersonasDTO): Promise<PersonasDTO> {
        return await this.asociados.loginPersonas(loginPersonas);
    }

    @Get('/session')
    @UseGuards(JwtMethods)
    async getSession(@Req() req:any){
        const token = req.headers.authorization?.split(' ')[1]; // Obtener el token desde el header Authorization
        return await this.asociados.getSession(token);
    }
}
