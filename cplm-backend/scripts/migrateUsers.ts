import { CognitoIdentityProviderClient, ListUsersCommand } from '@aws-sdk/client-cognito-identity-provider';
import { ManagementClient } from 'auth0';
import dotenv from 'dotenv';
import { db } from '../src/db/drizzle';
import { users } from '../src/db/drizzle/schema';
import { eq } from 'drizzle-orm';

dotenv.config();

const cognitoClient = new CognitoIdentityProviderClient({
  region: process.env.AWS_REGION,
});

const auth0Management = new ManagementClient({
  domain: process.env.AUTH0_DOMAIN!,
  clientId: process.env.AUTH0_CLIENT_ID!,
  clientSecret: process.env.AUTH0_CLIENT_SECRET!,
  scope: 'read:users create:users'
});

async function migrateUsers() {
  try {
    console.log('Starting user migration from Cognito to Auth0...');
    
    // Get all users from Cognito
    const listUsersCommand = new ListUsersCommand({
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
      Limit: 60, // Adjust as needed
    });
    
    const cognitoUsers = await cognitoClient.send(listUsersCommand);
    
    if (!cognitoUsers.Users || cognitoUsers.Users.length === 0) {
      console.log('No users found in Cognito.');
      return;
    }
    
    console.log(`Found ${cognitoUsers.Users.length} users in Cognito.`);
    
    // Process each user
    for (const cognitoUser of cognitoUsers.Users) {
      try {
        // Extract email
        const emailAttr = cognitoUser.Attributes?.find(attr => attr.Name === 'email');
        if (!emailAttr?.Value) {
          console.log(`User ${cognitoUser.Username} has no email, skipping.`);
          continue;
        }
        
        const email = emailAttr.Value;
        
        // Get user data from database
        const userProfile = await db
          .select()
          .from(users)
          .where(eq(users.id, cognitoUser.Username!))
          .limit(1);
          
        if (!userProfile.length) {
          console.log(`User ${cognitoUser.Username} not found in database, skipping.`);
          continue;
        }
        
        const { role, fullName, businessName, trade, yearsInBusiness } = userProfile[0];
        
        // Create user in Auth0
        // Note: We can't migrate passwords directly, users will need to reset their passwords
        const auth0User = await auth0Management.users.create({
          connection: 'Username-Password-Authentication',
          email,
          email_verified: true,
          app_metadata: { role },
          user_metadata: {
            fullName,
            businessName,
            trade,
            yearsInBusiness
          },
          password: `Auth0-${Math.random().toString(36).substring(2, 15)}` // Temporary password
        });
        
        console.log(`Migrated user ${email} to Auth0 with ID ${auth0User.user_id}`);
        
        // Update user ID in database if Auth0 uses a different format
        if (auth0User.user_id !== cognitoUser.Username) {
          await db
            .update(users)
            .set({ id: auth0User.user_id })
            .where(eq(users.id, cognitoUser.Username!));
          
          console.log(`Updated user ID in database from ${cognitoUser.Username} to ${auth0User.user_id}`);
        }
      } catch (error) {
        console.error(`Error migrating user ${cognitoUser.Username}:`, error);
      }
    }
    
    console.log('Migration completed.');
    
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

migrateUsers()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
