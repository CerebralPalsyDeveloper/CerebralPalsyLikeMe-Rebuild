import { db } from '../src/db/db';
import { users } from '../src/db/drizzle/schema';

async function insertTestUser() {
  try {
    await db.insert(users).values({
      id: 'local-test-user-id',
      email: 'testuser@example.com',
      fullName: 'Local Test User',
    });
    console.log('Test user inserted successfully.');
  } catch (error) {
    console.error('Error inserting test user:', error);
  } finally {
    process.exit(0);
  }
}

insertTestUser(); 