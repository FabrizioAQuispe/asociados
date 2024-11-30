import { JwtService } from "@nestjs/jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtMethods {

    private readonly secretKey = 'ESTA_ES_MI_CLAVE_SECRETA';

    constructor(
        private jwt:JwtService
    ){}

    async generateToken(data: any): Promise<any> {
        try {
            const token = await this.jwt.sign(data,{
                secret: this.secretKey,
                expiresIn: '72d'
            })
            return token;
        } catch (error) {
            throw new Error('ERROR GENERATE TOKEN: ' + error.message);
        }
    }

    async verifyToken(token: string): Promise<any> {
        try {
            const decoded = await this.jwt.verify(token, {
                secret: this.secretKey,
            });
            return decoded;
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw new UnauthorizedException('El token ha expirado.');
            } else if (error.name === 'JsonWebTokenError') {
                throw new UnauthorizedException('El token es inválido.');
            } else {
                throw new Error('ERROR VERIFY TOKEN SERVICE: ' + error.message);
            }
        }
    }

}