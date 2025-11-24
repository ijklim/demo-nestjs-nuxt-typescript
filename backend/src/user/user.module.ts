import { Module } from '@nestjs/common';
import { UserController } from './user.controller';

/**
 * UserModule encapsulates all user-related functionality.
 * This follows NestJS best practices by organizing features into separate modules.
 */
@Module({
  controllers: [UserController],
})
export class UserModule {}
