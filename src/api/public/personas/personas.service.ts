import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/api/prisma-service.service';
import { Request } from 'express';
import { JwtMethods } from 'src/utils/guards/gentoken.service';
import { PersonasDTO } from 'src/api/models/PersonasDTO';
import { ResponseCreateDTO, ResponseDeleteDTO, ResponseUpdateDTO } from 'src/api/models/ResponsesDTO';

@Injectable()
export class PersonasService {
    constructor(
        private sec:JwtMethods,
        private prisma:PrismaService
    ){}

    async getPersonas(request:Request){
        try {
            const userId = await this.sec.verifyToken(request.headers.authorization)
            if (!userId) {
                throw new Error('No se encontró el token adecuado');
            }

            const response  = await this.prisma.personas.findMany();
            
            if(!response){
                throw new Error('No se encontraron personas');
            }
        } catch (error) {
            throw new Error('ERROR SERVICE PERSONAS GET' + error);
        }
    }

    async createPersonas(personas:PersonasDTO,request:Request) : Promise<ResponseCreateDTO>{
        try {
            const token = request.headers.authorization?.split(' ')[1];
            if (!token) {
                throw new UnauthorizedException('Token no proporcionado');
            }
            // Verificar el token
            const userId = await this.sec.verifyToken(token);
            if (!userId) {
                throw new UnauthorizedException('No se encontró el token adecuado');
            }
            const response = await this.prisma.personas.create({
                data: personas
            });

            if(!response){
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

    async updatePersonas(personas:PersonasDTO,persId:number) : Promise<ResponseUpdateDTO>{
        try {
            const response = await this.prisma.personas.findFirst({
                where:{
                    idpers: Number(persId)
                }
            })

            if(!response.idpers){
                throw new Error('NO SE ENCONTRÓ PERSONA PARA ACTUALIZAR');
            }

            const result = await this.prisma.personas.update({
                where:{
                    idpers: Number(persId)
                },
                data: personas
            });

            if(!result){
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

    async deletePersonas(idpers:number,request:Request) : Promise<ResponseDeleteDTO>{
        try {
            const userId = await this.sec.verifyToken(request.headers.authorization)
            
            if (!userId) {
                throw new Error('No se encontró el token adecuado');
            }

            const response = await this.prisma.personas.findFirst({
                where:{
                    idpers: Number(idpers)
                }
            })

            if(!response.idpers){
                throw new Error('ERROR FIND PERSONAS');
            }

            const result = await this.prisma.personas.delete({
                where:{
                    idpers: Number(response.idpers)
                }
            });

            if(!result){
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

}
