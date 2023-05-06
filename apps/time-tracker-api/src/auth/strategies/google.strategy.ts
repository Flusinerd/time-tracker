import { Injectable } from "@nestjs/common";
import { Strategy } from "passport-google-oauth20";
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from "@nestjs/config";
import { GoogleUser } from "../google-auth.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {

  constructor(
    configService: ConfigService,
  ) {
    const config = {
      clientID: configService.get("GOOGLE_CLIENT_ID"),
      clientSecret: configService.get("GOOGLE_CLIENT_SECRET"),
      callbackURL: `${configService.get("URL")}/api/auth/google/callback`,
      scope: ["email", "profile"]
    }
    super(config);
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: (err: unknown, user: unknown) => void) {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken
    }
    return user;
  }
}