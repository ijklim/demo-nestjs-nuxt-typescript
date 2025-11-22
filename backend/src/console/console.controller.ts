import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
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
  create(@Body() createConsoleDto: CreateConsoleDto, @Request() req: any) {
    const consoleWithUser = {
      ...createConsoleDto,
      createdBy: req.user.userId
    };
    this.consoleService.addConsole(consoleWithUser);
    return consoleWithUser;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delete(@Param('id') id: string, @Request() req: any) {
    const console = this.consoleService.findById(id);

    if (!console) {
      throw new HttpException('Console not found', HttpStatus.NOT_FOUND);
    }

    if (console.createdBy !== req.user.userId) {
      throw new HttpException('You can only delete consoles you created', HttpStatus.FORBIDDEN);
    }

    this.consoleService.deleteConsole(id);
    return { message: 'Console deleted successfully' };
  }
}
