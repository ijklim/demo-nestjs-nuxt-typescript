import { Controller, Get, Req, UseGuards, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Get('github')
  @UseGuards(AuthGuard('github'))
  async githubLogin() {
    // Initiates the GitHub OAuth flow
  }

  @Get('callback')
  @UseGuards(AuthGuard('github'))
  async githubLoginCallback(@Req() req: any, @Res() res: any) {
    const jwt = await this.authService.login(req.user);

    // Redirect to frontend with token
    // FRONTEND_URL is set via environment variable (e.g., http://localhost:3000 or https://your-frontend.onrender.com)
    const frontendUrl = this.configService.get<string>('FRONTEND_URL') || 'http://localhost:3000';
    res.redirect(`${frontendUrl}/dashboard?token=${jwt.access_token}`);
  }
}
