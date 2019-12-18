FROM node:slim AS builder
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install
COPY ./ ./
RUN yarn build
RUN rm -rf ./node_modules && yarn install --production

FROM node:alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app ./
CMD NODE_ENV=production yarn start:prod
