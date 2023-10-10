import { Injectable } from '@nestjs/common';
import { ShutdownObserver } from './shutdownobserver';

@Injectable()
export class AppService {

  getHello(): string {
    return 'Hello World!';
  }
}
