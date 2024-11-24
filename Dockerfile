FROM node:18

WORKDIR /app

COPY package.json .

RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*
RUN npm install -g node-gyp
ENV npm_config_build_from_source=true
ENV npm_config_python=/usr/bin/python3

RUN npm install

COPY . .

CMD ["npm", "start"]