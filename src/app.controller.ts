import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { AwsService } from './aws/aws.service';
import { IEmailParams } from './aws/email.model';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly awsService: AwsService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/email/inquiry')
  async sendInquiryEmail(@Body() body: IEmailParams): Promise<string> {
    return await this.awsService.sendEmail(body);
  }
}
