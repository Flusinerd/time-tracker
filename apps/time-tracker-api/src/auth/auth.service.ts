import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { sign, verify } from 'jsonwebtoken';
import { PrismaService } from '../db/prisma.service';
import {
  AccessTokenPayload,
  RefreshTokenPayload,
} from './types/token-payloads';

@Injectable()
export class AuthService {
  private readonly jwtSecret: string;

  constructor(
    private readonly prismaService: PrismaService,
    config: ConfigService
  ) {
    const secret = config.get('JWT_SECRET');
    if (!secret) {
      throw new Error('JWT_SECRET not set in environment');
    }

    this.jwtSecret = secret;
  }

  validateUser(email: string) {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  async refreshTokens(refreshToken: string) {
    try {
      this.getRefreshTokenPayload(refreshToken);
    } catch (error) {
      throw new UnauthorizedException(
        'Invalid refresh token',
        'invalid_refresh_token'
      );
    }
    // Check if the refresh token is valid
    const refreshTokenDatabase =
      await this.prismaService.refreshToken.findUnique({
        where: {
          token: refreshToken,
        },
      });

    if (!refreshTokenDatabase) {
      throw new UnauthorizedException(
        'Invalid refresh token',
        'invalid_refresh_token'
      );
    }

    // Get the user id from the refresh token
    const { userId } = refreshTokenDatabase;

    // Get the user from the database
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new UnauthorizedException(
        'Invalid refresh token',
        'invalid_refresh_token'
      );
    }

    // Generate new access token
    const tokens = await this.generateJwtTokens(user);

    // Invalidate the old refresh token
    await this.prismaService.refreshToken.delete({
      where: {
        token: refreshToken,
      },
    });

    return { ...tokens, user };
  }

  public async generateJwtTokens(user: User) {
    const accessTokenPayload: AccessTokenPayload = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      picture: user.profile_picture,
    };

    const refreshTokenPayload: RefreshTokenPayload = {
      userId: user.id,
    };

    const accessToken = sign(accessTokenPayload, this.jwtSecret, {
      expiresIn: '15m',
    });
    const refreshToken = sign(refreshTokenPayload, this.jwtSecret, {
      expiresIn: '90d',
    });

    // Persist the refresh token in the database
    await this.prismaService.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
      },
    });

    return { accessToken, refreshToken };
  }

  private getRefreshTokenPayload(refreshToken: string): RefreshTokenPayload {
    return verify(refreshToken, this.jwtSecret) as RefreshTokenPayload;
  }
}
