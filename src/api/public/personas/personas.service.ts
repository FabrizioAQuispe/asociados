import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/api/prisma-service.service';
import { Request } from 'express';
import { JwtMethods } from 'src/utils/guards/gentoken.service';
import { PersonasDTO } from 'src/api/models/PersonasDTO';
import { ResponseCreateDTO, ResponseDeleteDTO, ResponseUpdateDTO } from 'src/api/models/ResponsesDTO';

@Injectable()
export class PersonasService {
    constructor(
        private sec: JwtMethods,
        private prisma: PrismaService
    ) { }

    async getDatosPersonaDni(dni: any) {
        try {
            const response = await this.prisma.personas.findFirst({
                where: {
                    dni: dni.dni
                }
            });

            if (!response) {
                throw new Error('ERROR GET DATOS PERSONAS RESPONSE');
            }
            return response;
        } catch (error) {
            throw new Error('ERROR GET DATOS PERSONAS DNI SERVICE: ' + error.message);
        }
    }

    async getPersonas() {
        try {
            const response = await this.prisma.personas.findMany();

            if (!response) {
                throw new Error('No se encontraron personas');
            }
            return response;
        } catch (error) {
            throw new Error('ERROR SERVICE PERSONAS GET' + error);
        }
    }

    async createPersonas(personas: PersonasDTO, request: Request): Promise<ResponseCreateDTO> {
        try {
            const bonito = await this.generarCodigoClient()
            personas.idpers = Number(bonito) + 1
            console.log(
                Number(bonito) + 1
            )
            const response = await this.prisma.personas.create({
                data: personas
            });

            if (!response) {
                throw new Error('ERROR AL CREAR PERSONAS POST');
            }

            const result: ResponseCreateDTO = {
                message: 'SE CREO CON EXITO',
                code: 201
            };

            return result;

        } catch (error) {
            throw new Error('ERROR SERVICE PERSONAS CREATE' + error);
        }
    }

    async updatePersonas(personas: PersonasDTO, persId: number): Promise<ResponseUpdateDTO> {   
        try {
            const response = await this.prisma.personas.findFirst({
                where: {
                    idpers: Number(persId)
                }
            })

            if (!response.idpers) {
                throw new Error('NO SE ENCONTRÓ PERSONA PARA ACTUALIZAR');
            }

            const result = await this.prisma.personas.update({
                where: {
                    idpers: Number(persId)
                },
                data: personas
            });

            if (!result) {
                throw new Error('ERROR AL ACTUALIZAR PERSONAS')
            }

            const responseok: ResponseUpdateDTO = {
                message: 'SE ACTUALIZO CON EXITO',
                code: 201
            };

            return responseok
        } catch (error) {
            throw new Error('ERROR UPDATE PERSONAS' + error);
        }
    }

    async deletePersonas(idpers: number, request: Request): Promise<ResponseDeleteDTO> {
        try {
            const userId = await this.sec.verifyToken(request.headers.authorization)

            if (!userId) {
                throw new Error('No se encontró el token adecuado');
            }

            const response = await this.prisma.personas.findFirst({
                where: {
                    idpers: Number(idpers),
                    AND: {

                    }
                }
            })

            if (!response.idpers) {
                throw new Error('ERROR FIND PERSONAS');
            }

            const result = await this.prisma.personas.delete({
                where: {
                    idpers: Number(response.idpers)
                }
            });

            if (!result) {
                throw new Error('ERROR DELETE PERSONAS');
            }

            const responseok: ResponseDeleteDTO = {
                message: 'SE ACTUALIZO CON EXITO',
                code: 201
            };

            return responseok;

        } catch (error) {
            throw new Error('ERROR DELETE PERSONAS' + error);
        }
    }

    async generarCodigoClient(): Promise<any> {
        try {
            const fecha = new Date();
            const anio = fecha.getFullYear();
            const mes = fecha.getMonth() + 1;

            const fechaCodigo = anio + '' + mes;

            const response = await this.prisma.$queryRaw`
                SELECT idpers
                FROM personas 
                WHERE CAST(idpers AS CHAR) LIKE ${fechaCodigo + '%'}
                order by idpers desc
            `;

            if(response[0]){
                return response[0].idpers;
            }

            return fechaCodigo + '0000';

        } catch (error) {
            console.error('Error en generarCodigoClient:', error);
            throw new Error('ERROR GENERAR CODIGO CLIENTE SERVICE: ' + error.message);
        }
    }


}
