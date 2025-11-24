import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const pkg = require('../package.json');
    return {
      environment: process.env.NODE_ENV,
      description: pkg.description,
      name: pkg.name,
      version: pkg.version,
    };
  }
}
