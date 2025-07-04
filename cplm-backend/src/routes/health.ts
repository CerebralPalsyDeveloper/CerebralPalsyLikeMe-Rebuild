import type { FastifyInstance } from 'fastify';

export default async function HealthRoutes(server: FastifyInstance) {
  server.get('/ping', async function () {
    return 'pong';
  });
}
