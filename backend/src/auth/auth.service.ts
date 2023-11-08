import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private JwtService: JwtService){}

 async register(createAuthDto: RegisterAuthDto) {
    const { password } = createAuthDto
    const plainToHash = await hash(password, 10)
   const userData = {...createAuthDto, password: plainToHash}
    return this.prismaService.user.create({
      data: userData
    })
  }

 async login(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto
    const userFound = await this.prismaService.user.findUnique({
      where:{
        email
      }
    })
    if (!userFound) throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND)

    const checkPassword = await compare(password, userFound.password)

    if (!checkPassword) throw new HttpException('INVALID_PASSWORD', HttpStatus.FORBIDDEN)

    const payload = { id: userFound.id, name: userFound.name, email: userFound.email };
    
    return {
      access_token: await this.JwtService.signAsync(payload)
    }
  }

}
