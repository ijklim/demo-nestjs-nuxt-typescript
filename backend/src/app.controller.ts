import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * AppController handles incoming requests and returns responses to the client.
 */
@Controller()
export class AppController {
  /**
   * Injects the AppService instance into the controller.
   * @param appService The service that provides business logic for the application.
   */
  constructor(private readonly appService: AppService) {}

  /**
   * Handles GET requests to the root URL and returns a greeting.
   * @returns An object containing a greeting message.
   */
  @Get()
  getHello(): object {
    return this.appService.getHello();
  }
}

