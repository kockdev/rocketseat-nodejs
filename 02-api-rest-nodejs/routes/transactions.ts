import { FastifyInstance } from 'fastify'
import knex from 'knex'

export async function transactionRoutes(app: FastifyInstance) {
  app.get('/hello', async () => {
    const transaction = await knex('transactions').select('*')

    return transaction
  })
}
