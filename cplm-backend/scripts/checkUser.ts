import 'dotenv/config';
import { db } from '../src/db/db';
import { users } from '../src/db/drizzle/schema';

async function checkUser() {
  try {
    console.log('Checking users table...');
    
    const allUsers = await db.select().from(users);
    console.log('All users:', allUsers);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    process.exit(0);
  }
}

checkUser(); 