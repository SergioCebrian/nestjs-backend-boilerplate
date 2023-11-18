import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import * as compression from 'compression';

import { HttpExceptionFilter } from '@filters/http-exception.filter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Improve your English')
    .setDescription('Improve your English API')
    .setContact(
      'Sergio Cebrián',
      'https://github.com/SergioCebrian',
      'sergiocebrian85@gmail.com',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('improve-your-english')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  app.use(compression());
  app.use(helmet());
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
}
bootstrap();
