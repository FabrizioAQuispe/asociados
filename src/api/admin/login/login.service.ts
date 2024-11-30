import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DataAdminDTO, DataAsociatedDTO, LoginAdminDTO, LoginAsociatedDTO, LoginPersonasDTO } from 'src/api/models/UserDTO';
import { PrismaService } from 'src/api/prisma-service.service';
import { JwtMethods } from 'src/utils/guards/gentoken.service';

@Injectable()
export class LoginService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private sec: JwtMethods
    ){}

    async loginAdmin(loginAdmin: LoginAdminDTO): Promise<DataAdminDTO> {
        try {

            if (loginAdmin.usuario === null || loginAdmin.usuario === undefined) {
                throw new Error('El codigo del admin esta vacio o es nulo');
            } else if (loginAdmin.password === null || loginAdmin.password === undefined) {
                throw new Error('La contraseña del asociado esta vacio o es nulo');
            }

            const response = await this.prisma.administradores.findMany({
                where: {
                    correo: loginAdmin.usuario,
                    password: loginAdmin.password,

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
                    f_update: response[0].f_update
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

    async loginSocio(loginSoc: LoginAsociatedDTO) : Promise<DataAsociatedDTO>{
        try {
 
            const response = await this.prisma.socios.findFirst({
                where:{
                    cod: loginSoc.codigo,
                    dni : loginSoc.dni
                }
            })

            if(!response.dni){
                throw new Error('ERROR FOUND DNI');
            }

            const result:DataAsociatedDTO = {
                cod: response.cod,
                tiposoc: response.tipsoc,
                ubignac: response.ubignac,
                ubigdir: Number(response.ubigdir),
                genero: response.genero,
                fnac: response.fnac,
                fing: response.fing,
                estado: response.estado.toString(),
                f_estado: response.f_estado,
                profesion: response.profesion,
                ocupacion: response.ocupacion,
                lugartrabajo: response.lugartrabajo,
                estcivil: response.estcivil,
                telf: response.telf,
                condasoc: response.condasoc,
                dni: response.dni,
                id: response.id,
                idpers: response.idpers,
                idpost: response.idpost
            }

            return result;
        } catch (error) {
            throw new Error('ERROR LOGIN SOCIO SERVICE' + error.message);
        }
    }

    async loginPersonas(loginPersonas:LoginPersonasDTO){
        try {
            const response = await this.prisma.personas.findFirst({
                where:{
                    correo: String(loginPersonas.codigo),
                    dni: loginPersonas.dni
                }
            })

            if(!response.dni){
                throw new Error('ERROR DNI IS EMPTY');
            }

            return response;
        } catch (error) {
            throw new Error('ERROR LOGIN PERSONAS SERVICE' + error.message);
        }
    }

   
    async getSession(token:string){
        try {
            const response = await this.sec.verifyToken(token);
            return response;
        } catch (error) {
            throw new Error('ERROR GET SESSION: ' + error.message);
        }
    }
}
