import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { snapshot: true });

  const PORT = process.env.PORT || 3001;

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  // 유효성 검사 수행을 위한 NestJS 내장함수인 `ValidationPipe`전역 설정
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Median')
    .setDescription('The Median API description')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);

  const logger = new Logger('START');
  logger.log(`

              🚀 Server ready at: http://localhost:${PORT}
              ⭐️ Reference :
                  - blog post       : https://www.prisma.io/blog/nestjs-prisma-rest-api-7D056s1BmOL0
                  - prisma examples : https://github.com/prisma/prisma-examples

  `);
}
bootstrap();
