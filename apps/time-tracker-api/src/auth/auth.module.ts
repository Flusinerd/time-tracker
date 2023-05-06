import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { GoogleAuthService } from './google-auth.service';
import { GoogleStrategy } from './strategies/google.strategy';
import { DbModule } from '../db/db.module';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [GoogleAuthService, GoogleStrategy, AuthService],
  imports: [DbModule],
})
export class AuthModule {}
