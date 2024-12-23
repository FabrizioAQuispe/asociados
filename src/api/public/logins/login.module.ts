import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/api/prisma-service.service';
import { JwtMethods } from 'src/utils/guards/gentoken.service';
import { LoginController } from './login.controller';
import { LoginServices } from './login.service';

@Module({
    imports:[],
    providers:[PrismaService,JwtService,JwtMethods,LoginServices],
    controllers:[LoginController]
})
export class LoginModules {}
