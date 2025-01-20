'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { AuthFormValues, authSchema } from '@/server/validations/auth';
import { cn } from '@/utils';

import { OAuthSignIn } from './oauth-signin';
import PhoneInput from './phone-input';
import { Button } from './ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from './ui/input-otp';

interface AuthFormProps {
  showTwoFactor: boolean;
  setShowTwoFactor: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AuthForm({ showTwoFactor, setShowTwoFactor }: AuthFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const [isPending, startTransition] = useTransition();

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      phoneNumber: '',
      code: '',
    },
  });

  async function sendVerificationCode() {
    const { phoneNumber } = form.getValues();

    startTransition(async () => {
      try {
        // await sendOTPCode(phoneNumber);
        setShowTwoFactor(true);
      } catch (err) {
        console.error(err);
      }
    });
  }

  async function verify() {
    const { code } = form.getValues();
    startTransition(async () => {
      try {
        const result = await signIn('otp', {
          callbackUrl: callbackUrl || '/',
          otp: code,
          redirect: false,
        });
      } catch (err) {
        console.error(err);
      }
    });
  }

  return (
    <>
      <Form {...form}>
        <form className="w-full">
          {!showTwoFactor ? (
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PhoneInput
                      {...field}
                      className={cn(
                        'mx-auto',
                        form.formState.errors.phoneNumber
                          ? 'border-red-500'
                          : ''
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP
                      maxLength={4}
                      pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                      {...field}
                    >
                      <InputOTPGroup
                        className={cn(
                          'mx-auto',
                          form.formState.errors.code ? 'border-red-500' : ''
                        )}
                      >
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <div className="mt-6">
            {!showTwoFactor ? (
              <Button
                className="w-full"
                disabled={isPending}
                onClick={sendVerificationCode}
              >
                {isPending ? 'Processing...' : 'Send code'}
              </Button>
            ) : (
              <Button className="w-full" disabled={isPending} onClick={verify}>
                {isPending ? 'Processing...' : 'Verify'}
              </Button>
            )}
          </div>
        </form>
      </Form>

      <OAuthSignIn />
    </>
  );
}
