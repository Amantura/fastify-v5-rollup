import {
  z
} from 'zod'

const notFound = name => `${name} not found!`

const envSchema = z.object({
  PORT: z.number({
    message: notFound('PORT')
  }),
  HOST: z.string({
    message: notFound('HOST')
  })
})

export class Env {
  #values = {
  }
  constructor() {
    if (this.constructor.instance) {
      return this.constructor.instance
    }

    this.#values = {
      HOST: process.env.HOST,
      PORT: parseInt(process.env.PORT)
    }

    this.constructor.instance = this
  }

  get values() {
    return this.#values
  }

  validate() {
    return new Promise((resolve) => {
      const { success, error, data } = envSchema.safeParse(this.#values)

      if (success) {
        resolve(data)
      } else {
        const { issues } = error

        for (const issue of issues) {
          console.log('env:', issue.path, issue.message)
        }
      }
    })
  }
}