FROM node:17.6.0-alpine AS base

WORKDIR /app

FROM base AS builder

COPY package.json .
RUN yarn
COPY . .
RUN yarn build

FROM base

COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/package.json /app
CMD [ "yarn", "start" ]