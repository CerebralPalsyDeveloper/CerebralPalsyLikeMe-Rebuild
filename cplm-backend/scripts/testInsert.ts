import 'dotenv/config';
import { db } from '../src/db/db';
import { CPUserInfo } from '../src/db/drizzle/schema';

async function testInsert() {
  try {
    console.log('Testing CP user info insertion...');
    
    const testData = {
      userId: 'local-test-user-id',
      canWalk: true,
      handTrouble: false,
      cpType: 'Spastic',
      canTalk: true,
      canSee: false,
      canHear: false,
      needAssistance: true,
      address: '123 Test St',
    };
    
    const result = await db.insert(CPUserInfo).values(testData).returning();
    console.log('Insert successful:', result);
    
  } catch (error) {
    console.error('Insert error:', error);
  } finally {
    process.exit(0);
  }
}

testInsert(); 