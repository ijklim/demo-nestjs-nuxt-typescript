import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConsoleModule } from './console/console.module';
import { AuthModule } from './auth/auth.module';
import { UserController } from './user.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ConsoleModule,
    AuthModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
