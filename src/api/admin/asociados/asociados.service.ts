import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { DataAdminDTO, DataAsociatedDTO, LoginAdminDTO, LoginAsociatedDTO } from 'src/api/models/UserDTO';
import { PrismaService } from 'src/api/prisma-service.service';
import { JwtMethods } from 'src/utils/guards/gentoken.service';

@Injectable()
export class AsociadosService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private sec: JwtMethods
    ) { }



    async loginAsociated(loginAdmin: LoginAdminDTO): Promise<DataAdminDTO> {
        try {

            if (loginAdmin.usuario === null || loginAdmin.usuario === undefined) {
                throw new Error('El codigo del admin esta vacio o es nulo');
            } else if (loginAdmin.password === null || loginAdmin.password === undefined) {
                throw new Error('La contraseña del asociado esta vacio o es nulo');
            }
            const response = await this.prisma.administradores.findMany({
                where: {
                    correo: loginAdmin.usuario,
                    password: loginAdmin.password
                }
            })

            if (response.length === 0) {
                throw new Error('USUARIO NO ENCONTRADO');
            }

            const payloads = {
                data: {
                    id: response[0].id,
                    nomb: response[0].nomb,
                    correo: response[0].correo,
                    f_creacion: response[0].f_creacion,
                    f_update: response[0].f_update,
                    isAdmin: true,
                    isPers: false,
                    isSoc: false
                }
            }

            const token = await this.sec.generateToken(payloads)
            console.log(token)
            const result: DataAdminDTO = {
                token: token,
                data: {
                    id: response[0].id,
                    nomb: response[0].nomb,
                    correo: response[0].correo,
                    f_creacion: response[0].f_creacion,
                    f_update: response[0].f_update,
                    isAdmin: true,
                    isPers: false,
                    isSoc: false
                }
            }


            return result;
        } catch (error) {
            throw new Error('ERROR SERVICE LOGIN ASOCIATED: ' + error.message);
        }
    }

    async getUsuarios(request: Request) {
        try {
            const userId = await this.sec.verifyToken(request.headers.authorization)
            console.log(userId);
            if (!userId) {
                throw new Error('No se encontró el token adecuado');
            }
    
            const response = await this.prisma.personas.findMany();
            if (!response) {
                throw new Error('ERROR RESPONSE USUARIOS');
            }
    
            return response;
        } catch (error) {
            throw new Error('ERROR GETUSERS SERVICE: ' + error.message);
        }
    }
}
