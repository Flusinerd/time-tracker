import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { sign } from 'jsonwebtoken';
import { PrismaService } from '../db/prisma.service';
import { User } from '@prisma/client';
import { AuthService } from './auth.service';

export type GoogleUser = {
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
  accessToken: string;
};

@Injectable()
export class GoogleAuthService {
  private readonly jwtSecret: string;

  constructor(
    configService: ConfigService,
    private readonly prismaService: PrismaService,
    private readonly authService: AuthService
  ) {
    const secret = configService.get('JWT_SECRET');
    if (!secret) {
      throw new Error('JWT_SECRET not set in environment');
    }

    this.jwtSecret = secret;
  }

  async login(req: Request) {
    if (!req.user) {
      return null;
    }

    const user = await this.findOrCreateUser(req.user as GoogleUser);

    try {
      const { accessToken, refreshToken } =
        await this.authService.generateJwtTokens(user);
      return {
        accessToken,
        refreshToken,
        user,
      };
    } catch (error) {
      throw new InternalServerErrorException('login failed', error.message);
    }
  }

  private async findOrCreateUser(user: GoogleUser) {
    const { email, firstName, lastName, picture } = user;

    const existingUser = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return existingUser;
    }

    const newUser = await this.prismaService.user.create({
      data: {
        email,
        firstName,
        lastName,
        profile_picture: picture,
      },
    });

    return newUser;
  }
}
