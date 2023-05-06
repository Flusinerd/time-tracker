import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { GoogleAuthService } from './google-auth.service';

@Controller('auth')
export class AuthController {
  private readonly url;

  constructor(
    private readonly googleAuthService: GoogleAuthService,
    configService: ConfigService,
    private readonly authService: AuthService
  ) {
    const url = configService.get('URL');
    if (!url) {
      throw new Error('URL not set in environment');
    }

    this.url = url;
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth() {
    return;
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const result = await this.googleAuthService.login(req);
    if (!result) {
      // Redirect user to failure page
      res.redirect(`${this.url}/login/failure`);
    } else {
      const { accessToken, refreshToken, user } = result;
      this.setTokenCookies(res, accessToken, refreshToken);

      // Base 64 url encode the user data
      const base64encodedUserData = Buffer.from(
        encodeURIComponent(JSON.stringify(user)),
        'utf8'
      ).toString('base64');

      res.redirect(
        `${this.url}/login/success?user=${encodeURIComponent(
          base64encodedUserData
        )}`
      );
    }
  }

  @Post('refresh')
  async refresh(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.cookies['refreshToken'];
    if (!refreshToken) {
      throw new UnauthorizedException('No refresh token provided');
    }

    const {
      accessToken,
      refreshToken: newRefreshToken,
      user,
    } = await this.authService.refreshTokens(refreshToken);

    this.setTokenCookies(res, accessToken, newRefreshToken);

    res.json(user);
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.sendStatus(200);
  }

  private setTokenCookies(
    res: Response,
    accessToken: string,
    refreshToken: string
  ) {
    const isProd = process.env.NODE_ENV === 'production';
    const sameSite = isProd ? 'none' : 'strict';
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: sameSite,
      expires: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      path: '/api/auth/refresh',
      secure: isProd,
      sameSite: sameSite,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
  }
}
