// Imports necessary modules and components from NestJS and other files.
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConsoleModule } from './console/console.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

// The @Module() decorator defines the module.
@Module({
  // 'imports' is an array of modules that are imported into this module.
  // ConfigModule.forRoot() loads environment variables and makes them available globally.
  // ConsoleModule, AuthModule, and UserModule are feature modules imported into the main application.
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ConsoleModule,
    AuthModule,
    UserModule,
  ],

  // 'controllers' is an array of controllers that are instantiated by this module.
  // AppController handles basic application routes (root level).
  controllers: [AppController],

  // 'providers' is an array of services that can be injected into other components.
  // AppService contains the core business logic for the application.
  providers: [AppService],
})
// AppModule is the root module of the application.
export class AppModule {}
