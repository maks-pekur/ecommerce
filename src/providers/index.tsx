"use client";

import { AuthModal } from "@/components/modals/auth-modal";
import {
  AlertTriangle,
  CircleCheckBig,
  CircleX,
  Info,
  Loader2,
} from "lucide-react";
import { ThemeProvider, useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      {children}
      <ModalProvider />
      <ToasterProvider />
    </ThemeProvider>
  );
};

const ToasterProvider = () => {
  const { resolvedTheme } = useTheme();

  return (
    <Toaster
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      toastOptions={{
        style: {
          background: "rgba(0, 0, 0, 0.8)",
          color: "white",
          padding: "10px 20px",
          borderRadius: "100px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        },
      }}
      icons={{
        success: <CircleCheckBig className="text-green-500 w-5 h-5" />,
        info: <Info className="text-blue-500 w-5 h-5" />,
        warning: <AlertTriangle className="text-yellow-500 w-5 h-5" />,
        error: <CircleX className="text-red-500 w-5 h-5" />,
        loading: <Loader2 className="text-gray-500 animate-spin w-5 h-5" />,
      }}
      position="top-center"
    />
  );
};

const ModalProvider = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <AuthModal />
    </>
  );
};
