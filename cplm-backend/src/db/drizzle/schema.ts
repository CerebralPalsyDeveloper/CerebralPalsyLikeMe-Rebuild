import { InferSelectModel, relations } from 'drizzle-orm';
import { boolean } from 'drizzle-orm/pg-core';
import { pgTable, uuid, decimal, text, timestamp, integer, pgEnum, varchar } from 'drizzle-orm/pg-core';


export const users = pgTable('users', {
  id: varchar('id').primaryKey(),
  email: varchar('email').notNull().unique(),
  fullName: varchar('full_name'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});
export const CPUserInfo = pgTable('cp_user_info', {
  userId: varchar('user_id').references(() => users.id),
  canWalk: boolean('can_walk'),
  handTrouble: boolean('hand_trouble'),
  cpType: varchar('cp_type'),
  canTalk: boolean('can_talk'),
  canSee: boolean('can_see'),
  canHear: boolean('can_hear'),
  needAssistance: boolean('need_assistance'),
  address: varchar('address'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

export const deviceInfo = pgTable('device_info', {
  DeviceID: integer('DeviceID').primaryKey(),
  DeviceName: varchar('DeviceName', { length: 100 }),
  DeviceDescription: varchar('DeviceDescription', { length: 255 }),
  CanWalk: varchar('CanWalk', { length: 10 }),
  HandTrouble: varchar('HandTrouble', { length: 10 }),
  CanTalk: varchar('CanTalk', { length: 10 }),
  CanSee: varchar('CanSee', { length: 10 }),
  CanHear: varchar('CanHear', { length: 10 }),
  NeedAssistance: varchar('NeedAssistance', { length: 10 }),
  Category: varchar('Category', { length: 50 }),
  Image: varchar('Image', { length: 1000 }),
  Website: varchar('Website', { length: 1000 }),
});

export const specialist_info = pgTable('specialist_info', {
  SpecialistID: integer('SpecialistID').primaryKey(),
  SpecialistName: varchar('SpecialistName', { length: 100 }),
  Specialties: varchar('Specialties', { length: 255 }),
  Address: varchar('Address', { length: 255 }),
  Expertise: varchar('Expertise', { length: 255 }),
  Classification: varchar('Classification', { length: 255 }),
});
