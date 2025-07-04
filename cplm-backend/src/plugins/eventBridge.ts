import fp from 'fastify-plugin';
import { EventBridge } from '@aws-sdk/client-eventbridge';
import { FastifyPluginAsync } from 'fastify';

export enum EventDetailType {
  USER_CREATED = 'USER_CREATED',
  USER_CREATION_FAILED = 'USER_CREATION_FAILED',
  USER_UPDATED = 'USER_UPDATED',
  USER_DELETED = 'USER_DELETED',
  USER_LOGIN = 'USER_LOGIN',
  USER_LOGOUT = 'USER_LOGOUT',
  PROJECT_CREATED = 'PROJECT_CREATED',
  PROJECT_STATUS_UPDATED = 'PROJECT_STATUS_UPDATED',
}

// Define the event types for better type safety
export interface EventDetails {
  [key: string]: any;
}

export interface EventOptions {
  eventBusName?: string;
  defaultSource?: string;
}

export interface Event<T extends EventDetails = EventDetails> {
  source?: string;
  detailType: EventDetailType;
  detail: T;
}

// Define the plugin options type
export interface EventBridgePluginOptions {
  region?: string;
  eventBusName?: string;
  defaultSource?: string;
}

// Extend FastifyInstance type declaration
declare module 'fastify' {
  interface FastifyInstance {
    events: {
      publish<T extends EventDetails>(event: Event<T>): Promise<void>;
      publishMany<T extends EventDetails>(events: Event<T>[]): Promise<void>;
    };
  }
}

const eventBridgePlugin: FastifyPluginAsync<EventBridgePluginOptions> = async (
  fastify,
  options
) => {
  const eventBridge = new EventBridge({
    region: options.region || process.env.AWS_REGION
  });

  const defaultOptions: EventOptions = {
    eventBusName: options.eventBusName || 'default',
    defaultSource: options.defaultSource || 'my-application'
  };

  // Function to publish a single event
  const publish = async <T extends EventDetails>(event: Event<T>) => {
    try {
      const result = await eventBridge.putEvents({
        Entries: [{
          EventBusName: defaultOptions.eventBusName,
          Source: event.source || defaultOptions.defaultSource,
          DetailType: event.detailType,
          Detail: JSON.stringify(event.detail),
          Time: new Date()
        }]
      });

      if (result.FailedEntryCount && result.FailedEntryCount > 0) {
        throw new Error(`Failed to publish event: ${JSON.stringify(result.Entries)}`);
      }

      fastify.log.debug({
        msg: 'Event published successfully',
        event: {
          source: event.source || defaultOptions.defaultSource,
          detailType: event.detailType,
          detail: event.detail
        }
      });
    } catch (error) {
      fastify.log.error({
        msg: 'Failed to publish event',
        error,
        event
      });
      throw error;
    }
  };

  // Function to publish multiple events
  const publishMany = async <T extends EventDetails>(events: Event<T>[]) => {
    try {
      const result = await eventBridge.putEvents({
        Entries: events.map(event => ({
          EventBusName: defaultOptions.eventBusName,
          Source: event.source || defaultOptions.defaultSource,
          DetailType: event.detailType,
          Detail: JSON.stringify(event.detail),
          Time: new Date()
        }))
      });

      if (result.FailedEntryCount && result.FailedEntryCount > 0) {
        throw new Error(`Failed to publish events: ${JSON.stringify(result.Entries)}`);
      }

      fastify.log.debug({
        msg: 'Events published successfully',
        eventCount: events.length
      });
    } catch (error) {
      fastify.log.error({
        msg: 'Failed to publish events',
        error,
        eventCount: events.length
      });
      throw error;
    }
  };

  // Decorate fastify instance with events methods
  fastify.decorate('events', {
    publish,
    publishMany
  });
};

export default fp(eventBridgePlugin, {
  name: 'fastify-eventbridge'
});