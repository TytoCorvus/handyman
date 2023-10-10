import { Module } from '@nestjs/common';

import { ConfigModule } from './config/config.module';
import { AwsModule } from './aws/aws.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShutdownObserver } from './shutdownobserver';

@Module({
  imports: [ ConfigModule, AwsModule],
  controllers: [AppController],
  providers: [AppService, ShutdownObserver],
})
export class AppModule {}
