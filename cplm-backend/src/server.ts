import Fastify from "fastify";
import cors from "@fastify/cors";
import sensible from "@fastify/sensible";
import userRoutes from "./routes/users";
import healthRoutes from "./routes/health";
import devicesRoutes from "./routes/devices";
import specialistsRoutes from "./routes/specialists";
import { db, pool } from "./db/db";
import dbPlugin from "./plugins/db";

const allowedOrigins = [
  "http://localhost:3000",
];

export async function buildServer(dbInstance = db, dbPool = pool) {
  const server = Fastify({
    logger: true
  });

  // Add sensible plugin for error handling
  server.register(sensible);

  // Enable CORS
  server.register(cors, {
    credentials: true,
    origin: allowedOrigins,
  });

  // Register database plugin
  server.register(dbPlugin, {
    dbInstance,
    dbPool,
  });

  // Register health routes
  server.register(healthRoutes);

  // Register user routes
  server.register(userRoutes, { prefix: "/users" });

  // Register devices routes
  server.register(devicesRoutes, { prefix: "/devices" });

  // Register specialists routes
  server.register(specialistsRoutes, { prefix: "/specialists" });

  return server;
}

export default buildServer;