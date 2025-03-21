import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin : "http://127.0.0.1:5500",
    methods : "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials : true,
  })
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
