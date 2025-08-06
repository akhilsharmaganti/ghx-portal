'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Form } from '@/components/ui/Form';
import { FormFieldGroup } from '@/components/ui/FormFieldGroup';
import { AuthLayout } from '@/components/layouts/AuthLayout';
import { AuthFooter } from '@/components/ui/AuthFooter';
import { LoadingOverlay } from '@/components/ui/LoadingOverlay';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Registration successful! Redirecting to sign in...');
        setIsRedirecting(true);
        setTimeout(() => {
          router.push('/auth/signin');
        }, 2000);
      } else {
        setError(data.message || 'Registration failed');
        setIsLoading(false);
      }
    } catch (error) {
      setError('An error occurred during registration');
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
        title="Registration Successful!" 
        message="Redirecting to sign in page..." 
      />
    );
  }

  return (
    <AuthLayout 
      title="Create Account" 
      subtitle="Join GHX Innovation Exchange"
    >
      <Form onSubmit={handleSubmit}>
        <FormFieldGroup>
          <Input
            label="First Name"
            type="text"
            value={formData.firstName}
            onChange={(value) => handleInputChange('firstName', value)}
            placeholder="Enter first name"
            required
            disabled={isLoading}
          />

          <Input
            label="Last Name"
            type="text"
            value={formData.lastName}
            onChange={(value) => handleInputChange('lastName', value)}
            placeholder="Enter last name"
            required
            disabled={isLoading}
          />
        </FormFieldGroup>

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
          placeholder="Enter password (min 6 characters)"
          required
          disabled={isLoading}
        />

        <Input
          label="Confirm Password"
          type="password"
          value={formData.confirmPassword}
          onChange={(value) => handleInputChange('confirmPassword', value)}
          placeholder="Confirm your password"
          required
          disabled={isLoading}
        />

        {error && (
          <div className="text-red-600 text-sm text-center">{error}</div>
        )}

        {success && (
          <div className="text-green-600 text-sm text-center">{success}</div>
        )}

        <Button
          type="submit"
          variant="primary"
          loading={isLoading}
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </Form>

      <AuthFooter 
        text="Already have an account?"
        linkText="Sign in here"
        linkHref="/auth/signin"
      />
    </AuthLayout>
  );
} 