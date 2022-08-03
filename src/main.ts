import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3001);
  const logger = new Logger('START');
  logger.log('서버 3001 포트로 실행중...');
}
bootstrap();
