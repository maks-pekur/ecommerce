"use client";

import { Button } from "@/components/ui/button";
import { useAuthModal } from "@/hooks/use-auth-modal";
import { signIn } from "next-auth/react";
import React from "react";
import { toast } from "sonner";
import { Icons } from "./icons";

const oauthProviders = [
  { name: "Google", strategy: "google", icon: "google" },
] satisfies {
  name: string;
  icon: keyof typeof Icons;
  strategy: string;
}[];

export function OAuthSignIn() {
  const [loading, setLoading] = React.useState<string | null>(null);
  const { closeModal } = useAuthModal();

  async function handleOAuthSignIn(provider: string) {
    try {
      setLoading(provider);
      const result = await signIn(provider);
      if (result?.ok) {
        closeModal();
      }
    } catch (err: unknown) {
      setLoading(null);
      toast.error("An error occurred during login. Please try again.");
      console.error(err);
    }
  }

  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Continue with
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
        {oauthProviders.map((provider) => {
          const Icon = Icons[provider.icon];

          return (
            <Button
              key={provider.strategy}
              variant="outline"
              className="w-full bg-background"
              onClick={() => void handleOAuthSignIn(provider.strategy)}
              disabled={loading === provider.strategy}
            >
              {loading === provider.strategy ? (
                <Icons.spinner
                  className="mr-2 size-4 animate-spin"
                  aria-hidden="true"
                />
              ) : (
                <Icon className="mr-2 size-4" aria-hidden="true" />
              )}
              {provider.name}
              <span className="sr-only">{provider.name}</span>
            </Button>
          );
        })}
      </div>
    </>
  );
}
