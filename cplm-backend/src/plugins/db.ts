import { FastifyPluginAsync } from "fastify";
import { fastifyPlugin } from "fastify-plugin";
import type { Pool } from "pg";
import type { DB } from "../db/db";
interface LogOnHooksPluginOptions {
  dbInstance: DB;
  dbPool: Pool;
}
declare module "fastify" {
  interface FastifyInstance {
    db: DB;
  }
}
const databasePlugin: FastifyPluginAsync<LogOnHooksPluginOptions> = async (
  fastify,
  opts
) => {
  fastify.decorate("db", opts.dbInstance);
  fastify.addHook("onClose", async () => {
    // Do not close the pool while running tests.
    // This is done to avoid double closing pool.
    // Regular pool closing happens when stopping the test container.
    if (process.env.NODE_ENV !== "test") {
      console.info("Closing DB pool");
      await opts.dbPool.end();
    }
  });
};
export default fastifyPlugin(databasePlugin);