FROM node:12

WORKDIR /code

ADD package.json yarn.lock /code/
RUN yarn install --frozen-lockfile

COPY bin /code/bin/
COPY lib /code/lib/

CMD node bin/start.js
