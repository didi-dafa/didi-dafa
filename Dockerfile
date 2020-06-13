FROM node:12-alpine

WORKDIR /app

RUN apk add --no-cache build-base \
    cairo-dev \
    pango-dev \
    jpeg-dev \
    giflib-dev \
    librsvg-dev \
    bash

COPY package*.json yarn*.lock ./
RUN npm i

COPY  ./თარგმანი ./თარგმანი
COPY ./სურათები ./სურათები
COPY ./ქვედა ./ქვედა
COPY ./*.js ./
RUN ls -lah ./

RUN mkdir -p ./მდგრადობა/საცავი/

CMD node ./მომსახურე.js
