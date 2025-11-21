import { Module } from '@nestjs/common';
import { ConsoleService } from './console.service';
import { ConsoleController } from './console.controller';

@Module({
  providers: [ConsoleService],
  controllers: [ConsoleController]
})
export class ConsoleModule {}
