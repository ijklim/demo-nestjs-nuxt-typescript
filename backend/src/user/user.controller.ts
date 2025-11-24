import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

/**
 * UserController handles user-related HTTP requests.
 */
@Controller('api/user')
export class UserController {
  /**
   * Retrieves the authenticated user's profile information.
   * @param req The request object containing the authenticated user data.
   * @returns The user profile object.
   */
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req: any) {
    return req.user;
  }
}
