import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ConsoleService } from './console.service';
import { Console } from './console.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateConsoleDto } from './create-console.dto';

@Controller('api/consoles')
export class ConsoleController {
  constructor(private readonly consoleService: ConsoleService) {}

  @Get()
  findAll(): Console[] {
    return this.consoleService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createConsoleDto: CreateConsoleDto) {
    this.consoleService.addConsole(createConsoleDto);
    return createConsoleDto;
  }
}
