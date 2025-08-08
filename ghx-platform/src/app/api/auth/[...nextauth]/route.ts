// Single Responsibility: NextAuth API route handler
import NextAuth from 'next-auth';
import { authConfigService } from '@/services';

const authOptions = authConfigService.getAuthOptions();
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };