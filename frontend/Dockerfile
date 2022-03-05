FROM node:17.6.0-alpine AS builder

WORKDIR /app

COPY package.json .
RUN yarn
COPY . .
RUN yarn build

FROM nginx

RUN mkdir -p /var/log/nginx
COPY --from=builder /app/dist /usr/share/nginx/html
COPY ../pub.conf /etc/nginx/conf.d/default.conf