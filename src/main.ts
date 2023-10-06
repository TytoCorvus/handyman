import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  if(process.env.NODE_ENV === 'production') {
    app.enableCors({origin: new RegExp('.*\.brycecollins\.net')})
  }
  await app.listen(3000);
}
bootstrap();
