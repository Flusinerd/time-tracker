import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { default as cookieParser } from 'cookie-parser';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.use(cookieParser());

  // const asyncApiOptions = new AsyncApiDocumentBuilder()
  //   .setTitle('Time Tracker API')
  //   .setDescription('The Time Tracker API description')
  //   .setVersion('1.0')
  //   .setDefaultContentType('application/json')
  //   .addSecurity('cookieAuth', {
  //     type: 'apiKey',
  //     in: 'cookie',
  //     name: 'accessToken',
  //   })
  //   .addServer('dev server', {
  //     url: 'http://localhost:4200/api',
  //     protocol: 'socket.io',
  //   })
  //   .build();

  // const asyncApiDocument = await AsyncApiModule.createDocument(
  //   app,
  //   asyncApiOptions
  // );
  // await AsyncApiModule.setup('/docs', app, asyncApiDocument);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
