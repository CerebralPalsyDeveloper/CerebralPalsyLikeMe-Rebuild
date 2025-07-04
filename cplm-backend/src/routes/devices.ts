import { FastifyPluginAsync } from 'fastify';
import { deviceInfo, CPUserInfo } from '../db/drizzle/schema';
import { eq, or, isNull, ilike, and } from 'drizzle-orm';

const devicesRoutes: FastifyPluginAsync = async (app) => {
  // Get all devices
  app.get('/all_devices', async (request, reply) => {
    try {
      const devices = await app.db.select().from(deviceInfo);
      return { success: true, data: devices };
    } catch (error) {
      app.log.error(error);
      return reply.internalServerError('Failed to fetch devices');
    }
  });

  // Search devices by user input
  app.post('/device_Search', async (request, reply) => {
    try {
      const { 
        can_walk, 
        hand_trouble, 
        can_talk, 
        can_see, 
        can_hear, 
        need_assistance, 
        search_input, 
        category 
      } = request.body as any;

      // Build dynamic where conditions
      const conditions = [];

      // Filter by user-specific parameters
      if (can_walk !== undefined) {
        conditions.push(
          or(
            eq(deviceInfo.CanWalk, can_walk),
            isNull(deviceInfo.CanWalk)
          )
        );
      }
      if (hand_trouble !== undefined) {
        conditions.push(
          or(
            eq(deviceInfo.HandTrouble, hand_trouble),
            isNull(deviceInfo.HandTrouble)
          )
        );
      }
      if (can_talk !== undefined) {
        conditions.push(
          or(
            eq(deviceInfo.CanTalk, can_talk),
            isNull(deviceInfo.CanTalk)
          )
        );
      }
      if (can_see !== undefined) {
        conditions.push(
          or(
            eq(deviceInfo.CanSee, can_see),
            isNull(deviceInfo.CanSee)
          )
        );
      }
      if (can_hear !== undefined) {
        conditions.push(
          or(
            eq(deviceInfo.CanHear, can_hear),
            isNull(deviceInfo.CanHear)
          )
        );
      }
      if (need_assistance !== undefined) {
        conditions.push(
          or(
            eq(deviceInfo.NeedAssistance, need_assistance),
            isNull(deviceInfo.NeedAssistance)
          )
        );
      }

      // Filter by category
      if (category) {
        conditions.push(eq(deviceInfo.Category, category));
      }

      // Filter by search input (device name, description, and category)
      if (search_input) {
        conditions.push(
          or(
            ilike(deviceInfo.DeviceName, `%${search_input}%`),
            ilike(deviceInfo.DeviceDescription, `%${search_input}%`),
            ilike(deviceInfo.Category, `%${search_input}%`)
          )
        );
      }

      // Execute the query
      let devices;
      if (conditions.length > 0) {
        devices = await app.db.select().from(deviceInfo).where(and(...conditions));
      } else {
        devices = await app.db.select().from(deviceInfo);
      }

      // Sort devices by relevance if search_input is provided
      if (search_input) {
        devices.sort((a, b) => {
          // Check which field has the best match for each device
          const aNameIndex = (a.DeviceName || '').toLowerCase().indexOf(search_input.toLowerCase());
          const bNameIndex = (b.DeviceName || '').toLowerCase().indexOf(search_input.toLowerCase());
          const aDescIndex = (a.DeviceDescription || '').toLowerCase().indexOf(search_input.toLowerCase());
          const bDescIndex = (b.DeviceDescription || '').toLowerCase().indexOf(search_input.toLowerCase());
          const aCatIndex = (a.Category || '').toLowerCase().indexOf(search_input.toLowerCase());
          const bCatIndex = (b.Category || '').toLowerCase().indexOf(search_input.toLowerCase());
          
          // Get the best match for each device (lowest index = better match)
          const aBestIndex = Math.min(
            aNameIndex === -1 ? Infinity : aNameIndex,
            aDescIndex === -1 ? Infinity : aDescIndex,
            aCatIndex === -1 ? Infinity : aCatIndex
          );
          const bBestIndex = Math.min(
            bNameIndex === -1 ? Infinity : bNameIndex,
            bDescIndex === -1 ? Infinity : bDescIndex,
            bCatIndex === -1 ? Infinity : bCatIndex
          );
          
          return aBestIndex - bBestIndex;
        });
      }

      return devices;
    } catch (error) {
      app.log.error(error);
      return reply.internalServerError('Failed to search devices');
    }
  });

  // Legacy route for backward compatibility
  app.get('/', async (request, reply) => {
    try {
      const devices = await app.db.select().from(deviceInfo);
      return { success: true, data: devices };
    } catch (error) {
      app.log.error(error);
      return reply.internalServerError('Failed to fetch devices');
    }
  });
};

export default devicesRoutes; 