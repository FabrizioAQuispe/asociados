import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUsuarios, PerfilUsuarios } from 'src/api/models/LoginDTO';
import { PrismaService } from 'src/api/prisma-service.service';
import { JwtMethods } from 'src/utils/guards/gentoken.service';

@Injectable()
export class LoginServices {
    constructor(
        private prisma:PrismaService,
        private jwt:JwtMethods
    ){}


    async loginTicketera(loginInput:LoginUsuarios) : Promise<PerfilUsuarios>{
        try {
            const userProfile = await this.prisma.usuarios.findFirst({
                where:{
                    usuario: loginInput.usuario,
                    password: loginInput.password
                },
                include:{ 
                    usuario_rol: {
                        include:{
                            roles: {
                                include:{
                                    rol_permiso: true
                                }
                            }
                        }
                    }
                }
            });

            if(!userProfile){
                throw new UnauthorizedException('USUARIO NO ENCONTRADO');
            }

            const payloads = {
                userId:userProfile.userId,
                nombre:userProfile.nombre, 
                usuario:userProfile.usuario,
                fec_create:userProfile.fec_create,
                fec_actu:userProfile.fec_actu,
                user_created:userProfile.user_created,
                user_actu:userProfile.user_actu,
                rol: userProfile.usuario_rol.map(ur => ur.roles)
            }
            const token = await this.jwt.generateToken(payloads);

            if(!token){
                throw new UnauthorizedException('ERROR TOKEN NOT FOUND');
            }

            const response:PerfilUsuarios = {
                data: userProfile,
                token   : token,
                
            }

            if(!response){
                throw new Error('PERFIL NO ENCONTRADO');
            }

            return response;
            
        } catch (error) {
            throw new Error('ERROR LOGIN TICKETERA SERVICE: ' + error.message);
        }
    }

    async getSession(token: string): Promise<any> {
        try {
            if (!token) {
                throw new UnauthorizedException('TOKEN NO PROPORCIONADO');
            }
    
            const payload = await this.jwt.verifyToken(token);
    
            if (!payload) {
                throw new UnauthorizedException('TOKEN INVÁLIDO');
            }
    
            const userProfile = await this.prisma.usuarios.findFirst({
                where: {
                    userId: payload.userId
                },
                include:{ 
                    usuario_rol: {
                        include:{
                            roles: {
                                include:{
                                    rol_permiso: {
                                        include:{
                                            secciones:true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            });
    
            if (!userProfile) {
                throw new UnauthorizedException('USUARIO NO ENCONTRADO');
            }

            const response:PerfilUsuarios = {
                data: userProfile,
                token   : token,
                
            }

            return response;
    
        } catch (error) {
            throw new Error('ERROR GET SESSIÓN: ' + error.message);
        }
    }
    
}
