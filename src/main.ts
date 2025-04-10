import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true })); // set it globally or individually on controller

  const config = new DocumentBuilder()
    .setTitle('Billing')
    .setDescription(
      'Billing API Documentation for Zurich Fullstack/Javascript and API Senior Developer Assessment.',
    )
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('APP_PORT');

  await app.listen(port ?? 3000);
}
bootstrap();
