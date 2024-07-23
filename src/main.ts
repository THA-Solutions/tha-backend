import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);


  const port = process.env.PORT || 3001;

  await app.listen(port);

  console.log(
    'Application is running on: http://localhost:%s/%s',
    port,
    globalPrefix,
  );
}
bootstrap();
