import {
  Env
} from '@/env'
import {
  Server
} from '@/server'

new Env()
  .validate()
  .then(() => {
    const server = new Server()
    server.init()
    server.start()
  })
