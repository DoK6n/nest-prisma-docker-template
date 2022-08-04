<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# 사용할 기술

#### 다음 도구를 사용하여 이 애플리케이션을 빌드합니다.

- 백엔드 프레임워크로서의 NestJS
- 객체 관계형 매퍼(ORM)로서의 Prisma
- 데이터베이스로서의 PostgreSQL
- API 문서 도구로서의 Swagger
- 프로그래밍 언어로서의 TypeScript

## 사전 필요 지식

- JavaScript 또는 TypeScript에 대한 기본 지식
- NestJS에 대한 기본 지식
- Docker에 대한 기본 지식

## 개발 환경

이 자습서를 따라 하려면 다음을 수행해야 합니다.

- Node.js 설치
- Docker 설치
- Prisma VSCode 확장 설치 (선택)

> 참고 1 : Prisma VSCode 확장은 Prisma에 대한 몇 가지 IntelliSense 및 구문 강조 표시를 추가합니다.
>
> 참고 2 : Unix 셸이 없는 경우(예: Windows 시스템에 있는 경우) 계속 따라할 수 있지만 시스템에 맞게 셸 명령을 수정해야 할 수도 있습니다.

# 프로젝트 생성

```bash
npx @nestjs/cli new median
```

CLI는 프로젝트에 대한 `패키지 관리자`를 선택하라는 메시지를 표시합니다

원하는 코드 편집기에서 새 Nest 프로젝트를 엽니다(VSCode 권장). 다음 파일이 표시되어야 합니다.

```tree
median
  ├── node_modules
  ├── src
  │   ├── app.controller.spec.ts
  │   ├── app.controller.ts
  │   ├── app.module.ts
  │   ├── app.service.ts
  │   └── main.ts
  ├── test
  │   ├── app.e2e-spec.ts
  │   └── jest-e2e.json
  ├── README.md
  ├── nest-cli.json
  ├── package-lock.json
  ├── package.json
  ├── tsconfig.build.json
  └── tsconfig.json
```

작업하는 대부분의 코드는 src디렉토리에 있습니다.  
NestJS CLI는 이미 몇 가지 파일을 생성했습니다. 주목할만한 것들 중 일부는 다음과 같습니다:

- `src/app.module.ts`: 애플리케이션의 루트 모듈입니다.
- `src/app.controller.ts`: 단일 경로가 있는 기본 컨트롤러
  - `/`이 경로는 간단한 `'Hello World!'`메시지를 반환합니다.
- `src/main.ts`: 애플리케이션의 진입점입니다. NestJS 애플리케이션을 시작합니다.

다음 명령을 사용하여 프로젝트를 시작할 수 있습니다.

```bash
npm run start:dev
```

# PostgreSQL 인스턴스 생성

```yaml
version: '3.7'
services:
  web:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - '3001:3001'
    volumes:
      - ./:/usr/src/app
      - /usr/src/app/node_modules
    restart: unless-stopped
    networks:
      - febnine-net
    depends_on:
      - postgres
  postgres:
    container_name: postgres-container
    image: postgres
    env_file:
      - .env
    ports:
      - '5432:5432'
    networks:
      - febnine-net
    volumes:
      - /Users/Shared/databases/postgresql/data:/var/lib/postgresql/data
volumes:
  postgres:
networks:
  febnine-net:
```

- `volumes`옵션은 호스트 파일 시스템에서 데이터를 유지하는 데 사용됩니다.
- Docker Compose는 디플트 네트워크 뿐만 아니라 다른 네트워크도 필요에 따라 추가해줄 수 있습니다.
  - docker-compose.yml의 networks 항목 아래에 febnine-net이라는 네트워크를 추가하고, web과 postgres의 networks 항목 아래에 febnine-net 네트워크를 추가합니다.
  - 요약하면 web container와 postgres container가 서로 연결되어 있다는 것을 말합니다.

```Dockerfile
FROM node:16

WORKDIR /usr/src/app

# 먼저 package.json만 복사 후 npm install을 해줌
# 먼저 COPY ./ ./ 를 하게되면 소스코드만 변경을 하더라도
# 종속성 패키지를 항상 새로 설치를 하게 되서 비효율적으로 빌드를 한다.
# 그렇기 때문에 package.json만 복사 후 npm install을 하게되면
# package.json은 변경이 되지 않았기 때문에 cache를 사용하기 때문에 효율적으로 빌드를 할 수 있게 된다.
COPY package.json ./

RUN npm install --silent

# 그 후 소스코드를 복사 > docker volumn 사용하므로 COPY 필요없음
# volumn : 로컬의 소스를 참조함 docker stop후 run 필요
# COPY ./ ./

CMD ["npm", "run", "start:dev"]
```

그 후 다음 명령어를 사용하여 Nest와 Postgres 컨테이너를 시작합니다.

```bash
docker-compose up -d
```

## 🎉 이제 도커를 이용한 개발환경이 준비되었습니다!

이제 나머지 추가 내용은 아래 링크를 타고 따라 진행하시면 됩니다.

- [Prisma 공식 블로그 글 - `NestJS 및 Prisma로 REST API 빌드`](https://www.prisma.io/blog/nestjs-prisma-rest-api-7D056s1BmOL0#prerequisites)
