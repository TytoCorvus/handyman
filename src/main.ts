import { NestFactory } from '@nestjs/core';
import * as http from 'http';
import * as https from 'https';
import { AppModule } from './app.module';
import * as express from 'express';

import * as fs from 'fs';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ShutdownObserver } from './shutdownobserver';

async function bootstrap() {
  console.log(`Starting in ${process.env['NODE_ENV']} environment`)

  const httpsOptions = {
    key: fs.readFileSync('certs/api.brycecollins.net_key.txt'),
    cert: fs.readFileSync('certs/api.brycecollins.net_cert.crt')
  };

  const server = express();
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server),
    { httpsOptions }
  );
  app.enableCors({origin: true})

  app.enableShutdownHooks();

  await app.init();

  const httpServer = http.createServer(server).listen(3000);
  const httpsServer = https.createServer(httpsOptions, server).listen(3001);

  const shutdownObserver = app.get(ShutdownObserver);
  shutdownObserver.addHttpServer(httpServer);
  shutdownObserver.addHttpServer(httpsServer);
}

bootstrap();
