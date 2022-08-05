import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  const logger = new Logger('START');
  await app.listen(3001, () => {
    logger.log(`

              🚀 Server ready at: http://localhost:3001
              ⭐️ Reference :
                  - blog post           : https://www.prisma.io/blog
                  - prisma examples     : https://github.com/prisma/prisma-examples/tree/latest/typescript/graphql-nestjs
                  - See sample queries  : http://pris.ly/e/ts/graphql-nestjs#using-the-graphql-api

    `);
  });
}
bootstrap();
