## Installation

```bash
# install dependencies
$ npm install

# create and run mysql docker
$ docker-compose -f "docker-compose-mysql.yml" up -d --build
```

## Running the app

```bash
# development
$ npm run start

# access http://localhost:3000/swagger
```

## Test

```bash
# unit tests on linux
$ npm run test:default

# unit tests on windows
$ npm run test:windows
```