import 'dotenv/config';
import buildServer from './server';

const start = async () => {
  try {
    const server = await buildServer();
    await server.listen({ port: parseInt(process.env.PORT || '8080'), host: '0.0.0.0' });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
