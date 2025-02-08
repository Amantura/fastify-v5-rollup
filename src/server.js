import Fastify from 'fastify'
import {
  fastifyConfig,
  listenParams
} from '@/configs/fastify'
import {
  multipartConfig
} from '@/configs/multipart'
import {
  swaggerConfig,
  swaggerUiConfig
} from '@/configs/swagger'
import {
  corsConfig
} from '@/configs/cors'

import {
  serializerCompiler, validatorCompiler
} from 'fastify-type-provider-zod'

import Formbody from '@fastify/formbody'
import Multipart from '@fastify/multipart'
import Swagger from '@fastify/swagger'
import SwaggerUi from '@fastify/swagger-ui'
import Cors from '@fastify/cors'


export class Server {
  constructor() {
    this.fastify = new Fastify(fastifyConfig)
  }

  init() {
    this.addTypeProvider()
    this.addListeners()
    this.addPlugins()
  }

  start() {
    this.fastify
      .listen(listenParams)
      .catch((error) => {
        console.error('Error starting server:', error)
        this.shutdown(error)
      })
  }

  addPlugins() {
    this.fastify
      .register(Formbody)
      .register(Multipart, multipartConfig)
      .register(Swagger, swaggerConfig)
      .register(SwaggerUi, swaggerUiConfig)
      .register(Cors, corsConfig)
  }

  addTypeProvider() {
    this.fastify
      .setValidatorCompiler(validatorCompiler)
    this.fastify
      .setSerializerCompiler(serializerCompiler)
  }

  addListeners() {
    const signals = [
      'SIGINT',
      'SIGTERM',
      'uncaughtException',
      'unhandledRejection'
    ]

    for (const signal of signals) {
      process
        .on(
          signal,
          error => this.shutdown(error)
        )
    }
  }

  async shutdown(error, code) {
    if (error) {
      console.log(error)
    }
    await this.fastify.close()
    process.exit(code)
  }
}