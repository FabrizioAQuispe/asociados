import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { PostulantesDTO } from 'src/api/models/PostulantesDTO';
import { ResponseCreateDTO } from 'src/api/models/ResponsesDTO';
import { PrismaService } from 'src/api/prisma-service.service';
import { JwtMethods } from 'src/utils/guards/gentoken.service';

@Injectable()
export class PostulantesService {
    constructor(
        private sec:JwtMethods,
        private prisma:PrismaService
    ){}

    async getPostulantes(request:Request){
        try {
            const token = request.headers.authorization?.split(' ')[1];
            if (!token) {
                throw new UnauthorizedException('Token no proporcionado');
            }
          const userId = await this.sec.verifyToken(token);
            if (!userId) {
                throw new UnauthorizedException('No se encontró el token adecuado');
            }

            const response = await this.prisma.postulantes.findMany();
            
            if(!response){
                throw new Error('ERROR RESPONSE POSTULANTES');
            }

            return response;
        } catch (error) {
            throw new Error('ERROR SERVICE POSTULANTES' + error.message);
        }
    }

    async createPostulantes(postulantes:PostulantesDTO){
        try {
            const response = await this.prisma.postulantes.create({
                data: postulantes,
                // select: {
                //     s_documentos: true,
                //     s_tipo_documentos: true,
                //     socios:true,
                //     personas:true
                // }
            })
 
            if(!response){
                throw new Error('ERROR AL CREAR POSTULANTES POST');
            }

            const result:ResponseCreateDTO = {
                message: 'SE CREO CON EXITO', 
                code: 201
            }

            return result;
        } catch (error) {
            throw new Error('ERROR CREATE POSTULANTES SERVICE: ' + error.message);
        }
    }
}
