import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
    this.getCurrentEnv();
  }

  @Get()
  private getCurrentEnv(): string {
    return this.appService.getCurrentEnv();
  }
}
