import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get<string>('GITHUB_CLIENT_ID') || '',
      clientSecret: configService.get<string>('GITHUB_CLIENT_SECRET') || '',
      callbackURL: configService.get<string>('GITHUB_CALLBACK_URL') || '',
      scope: ['public_profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    const { id, username, photos, emails } = profile;
    return {
      userId: id,
      username: username,
      picture: photos[0].value,
      email: emails && emails.length > 0 ? emails[0].value : null,
    };
  }
}
