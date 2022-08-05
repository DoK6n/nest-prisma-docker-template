<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# 사용할 기술

#### 다음 도구를 사용하여 이 애플리케이션을 빌드합니다.

- 백엔드 프레임워크로서의 NestJS
- 객체 관계형 매퍼(ORM)로서의 Prisma
- 데이터베이스로서의 PostgreSQL
- 프로그래밍 언어로서의 TypeScript
- GraphQL모듈

## 사전 필요 지식

- JavaScript 또는 TypeScript에 대한 기본 지식
- NestJS에 대한 기본 지식
- Docker에 대한 기본 지식
- GraphQL에 대한 기본 지식

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

---

# GraphQL Server Example with NestJS (code-first)

This example shows how to implement an **GraphQL server (code-first) with TypeScript** with the following stack:

- [NestJS](https://docs.nestjs.com/graphql/quick-start): Web framework for building scalable server-side applications
- [**Prisma Client**](https://www.prisma.io/docs/concepts/components/prisma-client): Databases access (ORM)
- [**Prisma Migrate**](https://www.prisma.io/docs/concepts/components/prisma-migrate): Database migrations
- [**SQLite**](https://www.sqlite.org/index.html): Local, file-based SQL database

The example was bootstrapped using the NestJS CLI command `nest new graphql-nestjs`.

## Getting started

### 1. Download example and install dependencies

Download this example:

```
curl https://codeload.github.com/prisma/prisma-examples/tar.gz/latest | tar -xz --strip=2 prisma-examples-latest/typescript/graphql-nestjs
```

Install npm dependencies:

```
cd graphql-nestjs
npm install
```

<details><summary><strong>Alternative:</strong> Clone the entire repo</summary>

Clone this repository:

```
git clone git@github.com:prisma/prisma-examples.git --depth=1
```

Install npm dependencies:

```
cd prisma-examples/typescript/graphql-nestjs
npm install
```

</details>

### 2. Create and seed the database

Run the following command to create your SQLite database file. This also creates the `User` and `Post` tables that are defined in [`prisma/schema.prisma`](./prisma/schema.prisma):

```
npx prisma migrate dev --name init
```

When `npx prisma migrate dev` is executed against a newly created database, seeding is also triggered. The seed file in [`prisma/seed.ts`](./prisma/seed.ts) will be executed and your database will be populated with the sample data.

### 2. Start the GraphQL server

Launch your GraphQL server with this command:

```
npm run dev
```

Navigate to [http://localhost:3000/graphql](http://localhost:3000/graphql) in your browser to explore the API of your GraphQL server in a [GraphQL Playground](https://github.com/prisma/graphql-playground).

## Using the GraphQL API

The schema that specifies the API operations of your GraphQL server is defined in [`./schema.graphql`](./schema.graphql). Below are a number of operations that you can send to the API using the GraphQL Playground.

Feel free to adjust any operation by adding or removing fields. The GraphQL Playground helps you with its auto-completion and query validation features.

### Retrieve all published posts and their authors

```graphql
query {
  feed {
    id
    title
    content
    published
    author {
      id
      name
      email
    }
  }
}
```

<details><summary><strong>See more API operations</strong></summary>

### Retrieve the drafts of a user

```graphql
{
  draftsByUser(userUniqueInput: { email: "mahmoud@prisma.io" }) {
    id
    title
    content
    published
    author {
      id
      name
      email
    }
  }
}
```

### Create a new user

```graphql
mutation {
  signupUser(data: { name: "Sarah", email: "sarah@prisma.io" }) {
    id
  }
}
```

### Create a new draft

```graphql
mutation {
  createDraft(
    data: { title: "Join the Prisma Slack", content: "https://slack.prisma.io" }
    authorEmail: "alice@prisma.io"
  ) {
    id
    viewCount
    published
    author {
      id
      name
    }
  }
}
```

### Publish/unpublish an existing post

```graphql
mutation {
  togglePublishPost(id: __POST_ID__) {
    id
    published
  }
}
```

Note that you need to replace the `__POST_ID__` placeholder with an actual `id` from a `Post` record in the database, e.g.`5`:

```graphql
mutation {
  togglePublishPost(id: 5) {
    id
    published
  }
}
```

### Increment the view count of a post

```graphql
mutation {
  incrementPostViewCount(id: __POST_ID__) {
    id
    viewCount
  }
}
```

Note that you need to replace the `__POST_ID__` placeholder with an actual `id` from a `Post` record in the database, e.g.`5`:

```graphql
mutation {
  incrementPostViewCount(id: 5) {
    id
    viewCount
  }
}
```

### Search for posts that contain a specific string in their title or content

```graphql
{
  feed(searchString: "prisma") {
    id
    title
    content
    published
  }
}
```

### Paginate and order the returned posts

```graphql
{
  feed(skip: 2, take: 2, orderBy: { updatedAt: desc }) {
    id
    updatedAt
    title
    content
    published
  }
}
```

### Retrieve a single post

```graphql
{
  postById(id: __POST_ID__) {
    id
    title
    content
    published
  }
}
```

Note that you need to replace the `__POST_ID__` placeholder with an actual `id` from a `Post` record in the database, e.g.`5`:

```graphql
{
  postById(id: 5) {
    id
    title
    content
    published
  }
}
```

### Delete a post

```graphql
mutation {
  deletePost(id: __POST_ID__) {
    id
  }
}
```

Note that you need to replace the `__POST_ID__` placeholder with an actual `id` from a `Post` record in the database, e.g.`5`:

```graphql
mutation {
  deletePost(id: 5) {
    id
  }
}
```

</details>

## Evolving the app

Evolving the application typically requires two steps:

1. Migrate your database using Prisma Migrate
1. Update your application code

For the following example scenario, assume you want to add a "profile" feature to the app where users can create a profile and write a short bio about themselves.

### 1. Migrate your database using Prisma Migrate

The first step is to add a new table, e.g. called `Profile`, to the database. You can do this by adding a new model to your [Prisma schema file](./prisma/schema.prisma) file and then running a migration afterwards:

```diff
// schema.prisma

model Post {
  id        Int     @default(autoincrement()) @id
  title     String
  content   String?
  published Boolean @default(false)
  author    User?   @relation(fields: [authorId], references: [id])
  authorId  Int
}

model User {
  id      Int      @default(autoincrement()) @id
  name    String?
  email   String   @unique
  posts   Post[]
+ profile Profile?
}

+model Profile {
+  id     Int     @default(autoincrement()) @id
+  bio    String?
+  userId Int     @unique
+  user   User    @relation(fields: [userId], references: [id])
+}
```

Once you've updated your data model, you can execute the changes against your database with the following command:

```
npx prisma migrate dev
```

### 2. Update your application code

You can now use your `PrismaClient` instance to perform operations against the new `Profile` table. Here are some examples:

#### Create a new profile for an existing user

```ts
const profile = await prisma.profile.create({
  data: {
    bio: 'Hello World',
    user: {
      connect: { email: 'alice@prisma.io' },
    },
  },
});
```

#### Create a new user with a new profile

```ts
const user = await prisma.user.create({
  data: {
    email: 'john@prisma.io',
    name: 'John',
    profile: {
      create: {
        bio: 'Hello World',
      },
    },
  },
});
```

#### Update the profile of an existing user

```ts
const userWithUpdatedProfile = await prisma.user.update({
  where: { email: 'alice@prisma.io' },
  data: {
    profile: {
      update: {
        bio: 'Hello Friends',
      },
    },
  },
});
```

## Next steps

- Check out the [Prisma docs](https://www.prisma.io/docs)
- Share your feedback in the [`prisma2`](https://prisma.slack.com/messages/CKQTGR6T0/) channel on the [Prisma Slack](https://slack.prisma.io/)
- Create issues and ask questions on [GitHub](https://github.com/prisma/prisma/)
- Watch our biweekly "What's new in Prisma" livestreams on [Youtube](https://www.youtube.com/channel/UCptAHlN1gdwD89tFM3ENb6w)
