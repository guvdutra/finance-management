import Fastify, { FastifyRequest, FastifyReply } from 'fastify';
import cors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const fastify = Fastify({ logger: true });
const prisma = new PrismaClient();

// Habilitar CORS para permitir requisições do frontend
fastify.register(cors, {
  origin: 'http://localhost:3000',
});

// Esquema de validação para transações usando Zod
const transactionSchema = z.object({
  description: z.string(),
  amount: z.number(),
  type: z.enum(['income', 'expense']),
  date: z.string(),
});

// Criar transação
fastify.post('/api/transactions', async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const parsedData = transactionSchema.parse(request.body);
    const transaction = await prisma.transaction.create({ data: parsedData });
    return reply.send(transaction);
  } catch (error) {
    return reply.status(400).send({ error: 'Invalid data format' });
  }
});

// Listar todas as transações
fastify.get('/api/transactions', async (request: FastifyRequest, reply: FastifyReply) => {
  const transactions = await prisma.transaction.findMany();
  return reply.send(transactions);
});

// Deletar transação por ID
fastify.delete('/api/transactions/:id', async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };
  try {
    await prisma.transaction.delete({ where: { id } });
    return reply.send({ message: 'Transaction deleted' });
  } catch (error) {
    return reply.status(404).send({ error: 'Transaction not found' });
  }
});

// Rota raiz opcional para testar a API
fastify.get('/', async (_, reply) => {
  return reply.send({ message: 'API de Gestão Financeira rodando!' });
});

// Rodar o servidor na porta 3001
fastify.listen({ port: 3001 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`🚀 Server running on ${address}`);
});
