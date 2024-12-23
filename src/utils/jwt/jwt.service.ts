import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from "jsonwebtoken"
import { DataAdminDTO } from 'src/api/models/UserDTO';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard {
    constructor(
        private jwtService:JwtService
    ){}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<Request>();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
          throw new UnauthorizedException('Token no encontrado');
        }
    
        try {
          const payload = this.jwtService.verify(token);
          request["data"] = payload
        } catch {
          throw new UnauthorizedException('Token inválido');
        }
    
        return true;
      }
      private extractTokenFromHeader(request: Request): string | undefined {
        const authHeader = request.headers.authorization;
    
        if (!authHeader) {
          throw new UnauthorizedException('Encabezado de autorización no encontrado');
        }
    
        const [type, token] = authHeader.split('  ');
    
        if (type !== 'Bearer ' || !token) {
          throw new UnauthorizedException('Formato de token inválido');
        }
    
        return token;
      }
}
