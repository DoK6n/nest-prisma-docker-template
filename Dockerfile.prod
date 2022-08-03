FROM node:16-alpine AS builder

WORKDIR /app

COPY package* ./

RUN rm -rf node_modules
RUN npm install --silent

COPY . .

RUN npm run build

# remove development dependencies
RUN npm prune --production

FROM node:16-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3001

CMD [ "npm", "run", "start:prod" ]