import {
  Env
} from '@/env'
import {
  jsonSchemaTransform,
} from 'fastify-type-provider-zod'

const env = new Env()

export const swaggerUiConfig = {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: false
  },
  staticCSP: false,
  transformSpecificationClone: false
}

export const swaggerConfig = {
  openapi: {
    info: {
      title: 'Api',
      description: 'docs',
      version: '1.0.0',
    },
    servers: [
      {
        url: `http://${env.values.HOST}:${env.values.PORT}`,
        description: 'Development server'
      },
    ],

    exposeRoute: true,

    security: [
      {
        bearerAuth: []
      }
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
  },
  transform: jsonSchemaTransform,
}