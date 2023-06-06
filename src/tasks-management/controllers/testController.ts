import { Controller, Get } from '@nestjs/common';

@Controller('api/test')
export class TestController {
  @Get()
  async getTaskById() {
    console.log('lui cristian ii merge');
    return JSON.stringify('Ana are mere');
  }
}
