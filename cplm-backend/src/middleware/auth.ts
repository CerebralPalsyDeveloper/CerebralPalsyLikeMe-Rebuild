import { FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';

class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    user?: {
      sub: string;
      email?: string;
      fullName?: string;
      [key: string]: any;
    };
  }
}

// Authentication middleware for Fastify routes
export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  try {
    const authHeader = request.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('No authorization token was found');
    }
    
    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET || 'your-secret-key';
    
    // Verify the token
    const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
    
    // Add the user to the Fastify request
    request.user = {
      sub: decoded.sub!,
      email: decoded.email as string,
      fullName: decoded.fullName as string,
      ...decoded
    };
  } catch (error) {
    request.log.error(error);
    return reply.unauthorized('Authentication required');
  }
}

// Role-based authorization middleware
export function requireRole(roles: string[]) {
  return async function(request: FastifyRequest, reply: FastifyReply) {
    try {
      if (!request.user) {
        throw new UnauthorizedError('User not authenticated');
      }
      
      // Check if user has the required role
      const userRoles = request.user.roles || [];
      if (!roles.some(role => userRoles.includes(role))) {
        return reply.forbidden('Insufficient permissions');
      }
    } catch (error) {
      request.log.error(error);
      return reply.unauthorized('Authentication required');
    }
  };
}
