#!/usr/bin/env tsx

/**
 * Admin User Seeding Script
 * Creates predefined admin users in Firebase Authentication
 * Run with: npm run seed:admin
 */

import { initializeApp, getApps } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

// Firebase configuration (should match your .env.local)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

// Predefined admin users
const adminUsers = [
  {
    email: 'admin@ghx.com',
    password: 'Admin123!@#',
    displayName: 'GHX Admin',
    role: 'SUPER_ADMIN'
  },
  {
    email: 'superadmin@ghx.com',
    password: 'SuperAdmin123!@#',
    displayName: 'GHX Super Admin',
    role: 'SUPER_ADMIN'
  },
  {
    email: 'contentadmin@ghx.com',
    password: 'ContentAdmin123!@#',
    displayName: 'Content Admin',
    role: 'CONTENT_ADMIN'
  },
  {
    email: 'useradmin@ghx.com',
    password: 'UserAdmin123!@#',
    displayName: 'User Admin',
    role: 'USER_ADMIN'
  }
];

async function createAdminUser(userInfo: typeof adminUsers[0]) {
  try {
    console.log(`🔄 Creating admin user: ${userInfo.email}`);
    
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userInfo.email,
      userInfo.password
    );

    console.log(`✅ Successfully created admin user: ${userInfo.email}`);
    console.log(`   - UID: ${userCredential.user.uid}`);
    console.log(`   - Role: ${userInfo.role}`);
    
    return userCredential.user;
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      console.log(`⚠️  Admin user already exists: ${userInfo.email}`);
      return null;
    } else {
      console.error(`❌ Error creating admin user ${userInfo.email}:`, error.message);
      throw error;
    }
  }
}

async function seedAdminUsers() {
  console.log('🚀 Starting admin user seeding process...\n');

  try {
    // Check if Firebase is properly configured
    if (!firebaseConfig.apiKey) {
      throw new Error('Firebase configuration is missing. Please check your .env.local file.');
    }

    console.log(`📡 Connected to Firebase project: ${firebaseConfig.projectId}\n`);

    // Create each admin user
    for (const adminUser of adminUsers) {
      await createAdminUser(adminUser);
      console.log(''); // Add spacing between users
    }

    console.log('🎉 Admin user seeding completed!\n');
    
    // Display login credentials
    console.log('📋 ADMIN LOGIN CREDENTIALS:');
    console.log('=' .repeat(50));
    adminUsers.forEach((user, index) => {
      console.log(`${index + 1}. ${user.role}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Password: ${user.password}`);
      console.log(`   Display Name: ${user.displayName}`);
      console.log('');
    });

    console.log('🔐 You can now login to the admin dashboard at:');
    console.log('   http://localhost:3000/auth/signin');
    console.log('   Then navigate to: http://localhost:3000/admin\n');

    process.exit(0);
  } catch (error) {
    console.error('💥 Fatal error during seeding:', error);
    process.exit(1);
  }
}

// Run the seeding script
if (require.main === module) {
  seedAdminUsers();
}

export { seedAdminUsers, adminUsers };

