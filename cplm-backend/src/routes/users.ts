import { Type } from '@sinclair/typebox';
import { authenticate } from '../middleware/auth';
import { users, CPUserInfo } from '../db/drizzle/schema';
import { eq } from 'drizzle-orm';
import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { DB } from '../db/db';

// Extend FastifyInstance type
declare module 'fastify' {
  interface FastifyInstance {
    db: DB;
  }
}

const userSchema = Type.Object({
  email: Type.String({ format: 'email' }),
  password: Type.String({ minLength: 8 }),
  firstName: Type.String(),
  lastName: Type.String(),
});

const loginSchema = Type.Object({
  email: Type.String({ format: 'email' }),
  password: Type.String({ minLength: 8 }),
});

const cpUserInfoSchema = Type.Object({
  canWalk: Type.String({ enum: ['Yes', 'No'] }),
  handTrouble: Type.String({ enum: ['Yes', 'No'] }),
  cpType: Type.String({ enum: ['Spastic', 'Hypotonic', 'Dyskinetic', 'Ataxic', 'Mixed'] }),
  canTalk: Type.String({ enum: ['Yes', 'No'] }),
  canSee: Type.String({ enum: ['Yes', 'No'] }),
  canHear: Type.String({ enum: ['Yes', 'No'] }),
  needAssistance: Type.String({ enum: ['Yes', 'No'] }),
  address: Type.String(),
});

const userRoutes: FastifyPluginAsyncTypebox = async (app) => {
  // Register new user
  app.post(
    '/register',
    {
      schema: {
        body: userSchema,
      },
    },
    async (request, reply) => {
      try {
        const { email, password, firstName, lastName } = request.body;

        // Check if user already exists
        const existingUser = await app.db
          .select()
          .from(users)
          .where(eq(users.email, email))
          .limit(1);

        if (existingUser.length > 0) {
          return reply.conflict('User already exists');
        }

        // Create user in database
        const [newUser] = await app.db
          .insert(users)
          .values({
            id: crypto.randomUUID(),
            email,
            fullName: `${firstName} ${lastName}`
          })
          .returning();

        return reply.status(201).send({
          success: true,
          data: {
            id: newUser.id,
            email: newUser.email,
            fullName: newUser.fullName,
          },
        });
      } catch (error) {
        app.log.error(error);
        return reply.internalServerError('Error creating user');
      }
    }
  );

  // Login user
  app.post(
    '/login',
    {
      schema: {
        body: loginSchema,
      },
    },
    async (request, reply) => {
      try {
        const { email, password } = request.body;

        // Find user
        const [user] = await app.db
          .select()
          .from(users)
          .where(eq(users.email, email))
          .limit(1);

        if (!user) {
          return reply.unauthorized('Invalid credentials');
        }

        // TODO: Add proper password hashing and verification
        // For now, just return success and generate a JWT token
        
        // Generate a simple JWT token (in production, use a proper JWT library)
        const jwt = require('jsonwebtoken');
        const secret = process.env.JWT_SECRET || 'your-secret-key';
        
        const token = jwt.sign(
          { 
            sub: user.id, 
            email: user.email,
            fullName: user.fullName 
          },
          secret,
          { expiresIn: '24h' }
        );

        return reply.send({
          success: true,
          data: {
            accessToken: token,
            refreshToken: 'dummy-refresh-token', // TODO: Generate real refresh token
          },
        });
      } catch (error) {
        app.log.error(error);
        return reply.internalServerError('Error during login');
      }
    }
  );

  // Save CP user info
  app.post(
    '/cp-info',
    {
      preHandler: authenticate,
      schema: {
        body: cpUserInfoSchema,
      },
    },
    async (request, reply) => {
      try {
        const { canWalk, handTrouble, cpType, canTalk, canSee, canHear, needAssistance, address } = request.body;
        
        // Get the real user ID from authentication
        const userId = request.user?.sub;
        if (!userId) {
          return reply.unauthorized('User not authenticated');
        }

        // Convert string values to boolean
        const cpUserInfo = {
          userId,
          canWalk: canWalk === 'Yes',
          handTrouble: handTrouble === 'Yes',
          cpType,
          canTalk: canTalk === 'Yes',
          canSee: canSee === 'Yes',
          canHear: canHear === 'Yes',
          needAssistance: needAssistance === 'Yes',
          address,
        };

        // Check if user info already exists
        const existingInfo = await app.db
          .select()
          .from(CPUserInfo)
          .where(eq(CPUserInfo.userId, userId))
          .limit(1);

        let result;
        if (existingInfo.length > 0) {
          // Update existing record
          [result] = await app.db
            .update(CPUserInfo)
            .set(cpUserInfo)
            .where(eq(CPUserInfo.userId, userId))
            .returning();
        } else {
          // Insert new record
          [result] = await app.db
            .insert(CPUserInfo)
            .values(cpUserInfo)
            .returning();
        }

        return reply.status(200).send({
          success: true,
          data: result,
        });
      } catch (error) {
        app.log.error(error);
        return reply.internalServerError('Error saving CP user info');
      }
    }
  );

  // Get CP user info
  app.get(
    '/cp-info',
    {
      preHandler: authenticate,
    },
    async (request, reply) => {
      try {
        // Get the real user ID from authentication
        const userId = request.user?.sub;
        if (!userId) {
          return reply.unauthorized('User not authenticated');
        }

        const [userInfo] = await app.db
          .select()
          .from(CPUserInfo)
          .where(eq(CPUserInfo.userId, userId))
          .limit(1);

        if (!userInfo) {
          return reply.notFound('CP user info not found');
        }

        return reply.send({
          success: true,
          data: userInfo,
        });
      } catch (error) {
        app.log.error(error);
        return reply.internalServerError('Error retrieving CP user info');
      }
    }
  );
};

export default userRoutes;
