FROM node:12

WORKDIR /code

ADD package.json yarn.lock /code/
RUN yarn install --frozen-lockfile

COPY src /code/src/

CMD node src/start.js
