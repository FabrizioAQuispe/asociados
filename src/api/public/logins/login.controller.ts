import { Body, Controller, Get, Post, Headers } from '@nestjs/common';
import { LoginServices } from './login.service';
import { LoginUsuarios, PerfilUsuarios } from 'src/api/models/LoginDTO';

@Controller('login-user')
export class LoginController {
    constructor(
        private loginService: LoginServices
    ) { }

    @Post('/auth')
    async loginTicketera(@Body() loginInput: LoginUsuarios): Promise<PerfilUsuarios> {
        return await this.loginService.loginTicketera(loginInput);
    }

    @Get('/session')
    async getSession(@Headers('authorization') token: string): Promise<any> {
        if (!token) {
            throw new Error('TOKEN NO PROPORCIONADO EN LAS CABECERAS');
        }
        const bearerToken = token.startsWith('Bearer ') ? token.slice(7) : token;
        return await this.loginService.getSession(bearerToken);
    }
}
