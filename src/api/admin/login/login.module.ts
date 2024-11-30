import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { PrismaService } from 'src/api/prisma-service.service';
import { JwtService } from '@nestjs/jwt';
import { JwtMethods } from 'src/utils/guards/gentoken.service';

@Module({
    providers: [LoginService,PrismaService,JwtService,JwtMethods],
    controllers:[LoginController]
})
export class LoginModule {}
