FROM migrate/migrate as migration

WORKDIR /usr/app

ENTRYPOINT migrate -source file://migrations -database "postgres://$POSTGRES_USER:$POSTGRES_PASSWORD@$POSTGRES_HOST:5432/$POSTGRES_DB?sslmode=disable" up

FROM node:18 as application

WORKDIR /usr/app

COPY package.json ./

RUN yarn

COPY . .

CMD ["yarn", "run-dev"]
