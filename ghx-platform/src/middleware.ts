import { withAuth } from 'next-auth/middleware';

// Single Responsibility: Route protection middleware
export default withAuth(
  function middleware(req) {
    // Additional middleware logic can be added here
    return;
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

// Protect dashboard and other authenticated routes
export const config = {
  matcher: ['/dashboard/:path*']
}; 