'use client';

import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAuthModal } from '@/hooks/use-auth-modal';

import { AuthForm } from '../auth-form';

export const AuthModal = () => {
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const { isOpen, closeModal } = useAuthModal();

  function handleClose() {
    closeModal();
    setShowTwoFactor(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader className="flex flex-col items-center space-y-2">
          <DialogTitle className="text-3xl">
            {!showTwoFactor ? 'Sign in' : 'Verify'}
          </DialogTitle>
          <DialogDescription>
            {!showTwoFactor
              ? 'We will offer you a gift on your birthday, store delivery address, and tell you about promotions'
              : '4-digit code was sent to'}
          </DialogDescription>
        </DialogHeader>

        <AuthForm
          showTwoFactor={showTwoFactor}
          setShowTwoFactor={setShowTwoFactor}
        />
      </DialogContent>
    </Dialog>
  );
};
