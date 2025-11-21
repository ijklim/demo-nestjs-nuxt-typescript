import { Controller, Get, Req, UseGuards, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
    // In a real app, you might use a cookie or a more secure way to pass the token
    // For this demo, we'll pass it in the query param to the dashboard
    res.redirect(`http://localhost:3000/dashboard?token=${jwt.access_token}`);
  }
}
