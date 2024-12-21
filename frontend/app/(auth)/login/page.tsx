"use client"

import { Button, Card, CardBody, CardHeader, Input, Form } from "@nextui-org/react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth.context";

export default function LoginPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { login } = useAuth();

  const validateUsername = (value: string) => {
    if (!value) return "Username is required";
    if (value.length < 3) return "Username must be at least 3 characters long";
    return null;
  };

  const validatePassword = (value: string) => {
    if (!value) return "Password is required";
    if (value.length < 6) return "Password must be at least 6 characters long";
    return null;
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    const usernameError = validateUsername(username);
    const passwordError = validatePassword(password);

    if (!usernameError && !passwordError) {
      try {
        setIsLoading(true);
        await login({ username, password });
        router.push('/');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
      } finally {
        setIsLoading(false);
        setIsSubmitted(false);
      }
    }
  };

  const getInputError = (value: string | undefined, validator: (value: string) => string | null) => {
    if (!isSubmitted) return false;
    if (!value) return true;
    return !!validator(value);
  };

  const getErrorMessage = (value: string | undefined, validator: (value: string) => string | null) => {
    if (!isSubmitted) return null;
    if (!value) return validator("");
    return validator(value);
  };

  return (
    <main className="min-h-screen w-full flex bg-gray-50">
      <div className="w-[55%] relative hidden lg:block">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
          alt="Students studying"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center text-white">
            <h1 className="text-6xl font-bold mb-6">Welcome Back!</h1>
            <p className="text-2xl text-gray-200 max-w-2xl leading-relaxed">
              Continue your learning journey with access to thousands of courses
            </p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-[45%] flex items-center justify-center p-8">
        <Card className="w-full max-w-xl p-6 shadow-xl">
          <CardHeader className="flex flex-col items-center text-center gap-3 pb-8">
            <h1 className="text-4xl font-bold">Login to T-Education</h1>
            <p className="text-xl text-gray-600">Please enter your credentials to continue</p>
            {error && (
              <p className="text-[#F31260] text-base font-medium mt-2">{error}</p>
            )}
          </CardHeader>
          <CardBody className="gap-8">
            <Form 
              className="flex flex-col gap-8 w-full mx-auto" 
              validationBehavior="native"
              onSubmit={handleLogin}
            >
              <div className="w-full flex flex-col gap-2">
                <Input
                  isRequired
                  name="username"
                  type="text"
                  label="Username"
                  placeholder="Enter your username"
                  labelPlacement="outside"
                  startContent={
                    <Icon icon="ph:user" className="text-2xl text-gray-400" />
                  }
                  variant="bordered"
                  size="lg"
                  isDisabled={isLoading}
                  classNames={{
                    label: "text-lg font-medium text-[#F31260] -mb-4",
                    input: "text-lg",
                    inputWrapper: "h-14",
                    errorMessage: "text-[#F31260] text-base font-medium",
                    base: "group",
                    mainWrapper: "h-full",
                    innerWrapper: "h-full",
                    description: "text-[#F31260]",
                  }}
                  isInvalid={getInputError(
                    document.querySelector<HTMLInputElement>('input[name="username"]')?.value,
                    validateUsername
                  )}
                  errorMessage={getErrorMessage(
                    document.querySelector<HTMLInputElement>('input[name="username"]')?.value,
                    validateUsername
                  )}
                />
              </div>
              <div className="w-full flex flex-col gap-2">
                <Input
                  isRequired
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="Enter your password"
                  labelPlacement="outside"
                  startContent={
                    <Icon icon="ph:lock-simple" className="text-2xl text-gray-400" />
                  }
                  variant="bordered"
                  size="lg"
                  isDisabled={isLoading}
                  classNames={{
                    label: "text-lg font-medium text-[#F31260] -mb-4",
                    input: "text-lg",
                    inputWrapper: "h-14",
                    errorMessage: "text-[#F31260] text-base font-medium",
                    base: "group",
                    mainWrapper: "h-full",
                    innerWrapper: "h-full",
                    description: "text-[#F31260]",
                  }}
                  isInvalid={getInputError(
                    document.querySelector<HTMLInputElement>('input[name="password"]')?.value,
                    validatePassword
                  )}
                  errorMessage={getErrorMessage(
                    document.querySelector<HTMLInputElement>('input[name="password"]')?.value,
                    validatePassword
                  )}
                />
              </div>
              <div className="w-full flex justify-between items-center pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 rounded" 
                    name="remember"
                    disabled={isLoading}
                  />
                  <span className="text-lg text-gray-600">Remember me</span>
                </label>
                <Link 
                  href="/forgot-password" 
                  className="text-lg text-black hover:underline font-medium"
                >
                  Forgot password?
                </Link>
              </div>
              <Button 
                type="submit"
                className="w-full h-14 bg-black text-white text-lg font-semibold hover:scale-[1.02] transition-transform mt-4"
                isLoading={isLoading}
                isDisabled={isLoading}
              >
                {isLoading ? 'Logging in...' : (
                  <>
                    Login
                    <Icon icon="ph:arrow-right" className="ml-2 text-xl" />
                  </>
                )}
              </Button>
            </Form>

            <p className="text-center text-lg text-gray-600 mt-6">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-black font-semibold hover:underline">
                Sign up
              </Link>
            </p>
          </CardBody>
        </Card>
      </div>
    </main>
  );
} 