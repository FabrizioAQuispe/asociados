import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET, PUT, POST , DELETE, PATCH,HEAD',
    credentials: true
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
