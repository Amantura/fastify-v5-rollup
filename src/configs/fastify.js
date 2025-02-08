export const loggerConfig = {
  transport: {
    target: 'pino-pretty',
    options: {
      translateTime: 'HH:MM:ss Z',
      ignore: 'pid,hostname'
    }
  }
}

export const fastifyConfig = {
  ignoreTrailingSlash: true,
  logger: loggerConfig
}

export const listenParams = {
  port: 3000,
  host: 'localhost'
}