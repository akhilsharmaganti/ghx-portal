// Authentication Config Service
// Handles NextAuth configuration and validation
// Follows Single Responsibility Principle

import { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { IAuthConfigService } from './auth.interface';

// Augment NextAuth types for TypeScript compliance
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
    };
  }
  
  interface User {
    id: string;
    email: string;
    name: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
  }
}

export class AuthConfigService implements IAuthConfigService {
  getAuthOptions(): NextAuthOptions {
    return {
      providers: [
        CredentialsProvider({
          name: 'credentials',
          credentials: {
            email: { label: 'Email', type: 'email' },
            password: { label: 'Password', type: 'password' }
          },
          async authorize(credentials): Promise<User | null> {
            if (!credentials?.email || !credentials?.password) {
              return null;
            }

            try {
              const user = await prisma.users.findUnique({
                where: {
                  email: credentials.email
                }
              });

              if (!user) {
                return null;
              }

              const isPasswordValid = await bcrypt.compare(
                credentials.password,
                user.password_hash
              );

              if (!isPasswordValid) {
                return null;
              }

              return {
                id: user.user_id.toString(),
                email: user.email,
                name: `${user.first_name} ${user.last_name}`,
              };
            } catch (error: unknown) {
              console.error('Authorization error:', error);
              return null;
            }
          }
        })
      ],
      session: {
        strategy: 'jwt' as const,
      },
      callbacks: {
        async jwt({ token, user }) {
          if (user) {
            token.id = user.id;
          }
          return token;
        },
        async session({ session, token }) {
          if (token && session.user) {
            session.user.id = token.id;
          }
          return session;
        },
      },
      pages: {
        signIn: '/auth/signin',
        newUser: '/auth/signup',
      },
    };
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validatePassword(password: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }

    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }

    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
} 