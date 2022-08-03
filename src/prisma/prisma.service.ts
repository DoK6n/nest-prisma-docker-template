import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * NestJS 애플리케이션을 설정할 때 서비스 내의 데이터베이스 쿼리를 위해 Prisma Client API를 추상화하고 싶을 것입니다.
 * 시작하려면 PrismaClient를 인스턴스화하고 데이터베이스에 연결하는 새로운 PrismaService를 생성할 수 있습니다.
 * ---
 * `Note`
 * onModuleInit는 선택 사항입니다.
 * 생략하면 Prisma는 데이터베이스에 대한 첫 번째 호출에서 느리게 연결합니다.
 * Prisma에는 연결을 끊을 자체 종료 후크가 있기 때문에 onModuleDestroy에 신경 쓰지 않습니다.
 * enableShutdownHooks에 대한 자세한 내용은 enableShutdownHooks 관련 문제를 참조하세요.
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
