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
