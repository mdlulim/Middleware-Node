FROM registry.apps.k8s-01.prod.bluelabel.co.za/lsdautomate/base-images/nodejs:1.3.0
ARG NPM_TOKEN
ARG HTTP_PROXY
ARG HTTPS_PROXY
ARG NO_PROXY
# Ensure we always run in UTC time
ENV TZ utc
ENV NODE_ENV production
ENV PORT 80
ENV DEBUG_PORT 8080
WORKDIR /usr/app/modules/server
# Required by node-gyp
RUN set -x \
    && apt update \
    && apt install python3-pip -y
COPY package.json /usr/app/
COPY yarn.lock /usr/app/
COPY .yarnrc /usr/app/

COPY modules/server/build /usr/app/modules/server/
COPY modules/server/graphql.schema.json /usr/app/modules/server/
COPY modules/server/schema.graphql /usr/app/modules/server/
COPY modules/server/docker/entrypoint.sh /usr/entrypoint.sh
RUN set -x \
    && cp /root/.npmrc /usr/app/ \
    && export http_proxy=$HTTP_PROXY \
    && export https_proxy=$HTTPS_PROXY \
    && export https_proxy=$NO_PROXY \
    && yarn config set proxy $HTTP_PROXY \
    && yarn config set https-proxy $HTTPS_PROXY \
    && yarn install --production --frozen-lockfile \
    && yarn cache clean
ENTRYPOINT [ "/usr/entrypoint.sh" ]
CMD [ "server" ]
