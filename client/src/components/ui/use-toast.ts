"use client";

import { toast as sonnerToast, Toaster } from "sonner";

type ToastOptions = any;

export const useToast = () => {
  return {
    toast: {
      success: (message: string, options?: ToastOptions) =>
        sonnerToast.success(message, options),
      error: (message: string, options?: ToastOptions) =>
        sonnerToast.error(message, options),
      info: (message: string, options?: ToastOptions) =>
        sonnerToast.message(message, options),
      warning: (message: string, options?: ToastOptions) =>
        sonnerToast.warning(message, options),
      custom: sonnerToast.custom,
      dismiss: sonnerToast.dismiss,
    },
  };
};

export { Toaster };
