import 'dotenv/config';
import { db } from '../src/db/db';
import { users, CPUserInfo } from '../src/db/drizzle/schema';

async function clearTables() {
  try {
    console.log('Clearing all tables...');
    
    // Clear cp_user_info table first (due to foreign key constraint)
    const cpInfoResult = await db.delete(CPUserInfo);
    console.log('Cleared cp_user_info table');
    
    // Clear users table
    const usersResult = await db.delete(users);
    console.log('Cleared users table');
    
    console.log('All tables cleared successfully!');
    
  } catch (error) {
    console.error('Error clearing tables:', error);
  } finally {
    process.exit(0);
  }
}

clearTables(); 