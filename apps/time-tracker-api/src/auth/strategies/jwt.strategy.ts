import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { AccessTokenPayload } from '../types/token-payloads';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService, private authService: AuthService) {
    const jwtSecret = config.get('JWT_SECRET');
    if (!jwtSecret) {
      throw new Error('JWT_SECRET not set in environment');
    }

    super({
      jwtFromRequest: JwtStrategy.extractAccessToken,
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  private static extractAccessToken(req: Request): string | null {
    if (req.cookies && req.cookies['accessToken']) {
      return req.cookies['accessToken'] ?? null;
    }
    return null;
  }

  async validate(payload: AccessTokenPayload) {
    // Check if the user exists
    const user = await this.authService.validateUser(payload.email);
    if (!user) {
      throw 'User not found';
    }

    return user;
  }
}
