import 'dotenv/config';
import jwt from 'jsonwebtoken';

async function debugToken() {
  try {
    console.log('Testing JWT token generation and verification...');
    
    const secret = process.env.JWT_SECRET || 'your-secret-key';
    console.log('JWT Secret:', secret);
    
    // Test token generation
    const testUser = {
      sub: 'test-user-id',
      email: 'test@example.com',
      fullName: 'Test User'
    };
    
    const token = jwt.sign(testUser, secret, { expiresIn: '24h' });
    console.log('Generated token:', token);
    
    // Test token verification
    const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
    console.log('Decoded token:', decoded);
    
    console.log('JWT token generation and verification successful!');
    
  } catch (error) {
    console.error('JWT error:', error);
  } finally {
    process.exit(0);
  }
}

debugToken(); 