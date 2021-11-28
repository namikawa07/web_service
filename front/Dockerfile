FROM node:16-alpine

ARG WORKDIR
ARG CONTAINER_PORT
ARG API_URL

ENV HOME=/${WORKDIR} \
    LANG=C.UTF-8 \
    TZ=Asia/Tokyo \
    HOST=0.0.0.0  \
    API_URL=${API_URL} \
    NPM_CONFIG_PRODUCTION=false

# ENV check（このRUN命令は確認のためなので無くても良い）
RUN echo ${HOME}
RUN echo ${CONTAINER_PORT}
RUN echo ${API_URL}

WORKDIR ${HOME}

COPY package*.json ./
RUN yarn install

COPY . .

RUN yarn run build

EXPOSE ${CONTAINER_PORT}
