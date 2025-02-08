import {
  Env 
} from '@/env'

const env = new Env()

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
  port: env.values.PORT,
  host: env.values.HOST
}