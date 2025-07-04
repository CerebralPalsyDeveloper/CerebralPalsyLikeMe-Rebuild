import 'dotenv/config';
import { db } from '../src/db/db';
import { users, CPUserInfo } from '../src/db/drizzle/schema';

async function testDb() {
  try {
    console.log('Testing database connection...');
    console.log('DB_HOST:', process.env.DB_HOST);
    console.log('DB_NAME:', process.env.DB_NAME);
    
    // Test users table
    const userCount = await db.select().from(users);
    console.log(`Users table has ${userCount.length} records`);
    
    // Test cp_user_info table
    const cpInfoCount = await db.select().from(CPUserInfo);
    console.log(`CP user info table has ${cpInfoCount.length} records`);
    
    console.log('Database connection successful!');
  } catch (error) {
    console.error('Database error:', error);
  } finally {
    process.exit(0);
  }
}

testDb(); 