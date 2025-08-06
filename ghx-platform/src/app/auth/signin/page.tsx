'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Form } from '@/components/ui/Form';
import { AuthLayout } from '@/components/layouts/AuthLayout';
import { AuthFooter } from '@/components/ui/AuthFooter';
import { LoadingOverlay } from '@/components/ui/LoadingOverlay';

export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false
      });

      if (result?.error) {
        setError('Invalid email or password');
        setIsLoading(false);
      } else {
        setIsRedirecting(true);
        router.push('/dashboard');
      }
    } catch (error) {
      setError('An error occurred during sign in');
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    if (!isLoading && !isRedirecting) {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  if (isRedirecting) {
    return (
      <LoadingOverlay 
        title="Sign In Successful!" 
        message="Redirecting to dashboard..." 
      />
    );
  }

  return (
    <AuthLayout 
      title="Sign In" 
      subtitle="Welcome back to GHX Innovation Exchange"
    >
      <Form onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(value) => handleInputChange('email', value)}
          placeholder="Enter your email"
          required
          disabled={isLoading}
        />

        <Input
          label="Password"
          type="password"
          value={formData.password}
          onChange={(value) => handleInputChange('password', value)}
          placeholder="Enter your password"
          required
          disabled={isLoading}
        />

        {error && (
          <div className="text-red-600 text-sm text-center">{error}</div>
        )}

        <Button
          type="submit"
          variant="primary"
          loading={isLoading}
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>
      </Form>

      <AuthFooter 
        text="Don't have an account?"
        linkText="Sign up here"
        linkHref="/auth/signup"
      />
    </AuthLayout>
  );
} 