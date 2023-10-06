import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  if(process.env.NODE_ENV === 'production') {
    app.enableCors({origin: '*.brycecollins.net'})
  }
  await app.listen(3000);
}
bootstrap();
