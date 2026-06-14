"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
  isExiting?: boolean;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void;
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
  warning: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, isExiting: true } : t)));
    
    // Actually remove from state after exit animation finishes (500ms)
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 500);
  }, []);

  const toast = useCallback((message: string, type: ToastType = "info") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto-remove after 4 seconds
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  }, [removeToast]);

  const success = useCallback((message: string) => toast(message, "success"), [toast]);
  const error = useCallback((message: string) => toast(message, "error"), [toast]);
  const info = useCallback((message: string) => toast(message, "info"), [toast]);
  const warning = useCallback((message: string) => toast(message, "warning"), [toast]);

  return (
    <ToastContext.Provider value={{ toast, success, error, info, warning }}>
      {children}
      
      {/* Toast container portal */}
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-3.5 max-w-[calc(100vw-48px)] sm:max-w-md pointer-events-none select-none">
        {toasts.map((t) => {
          // Icon mapping
          const Icon = {
            success: CheckCircle2,
            error: AlertCircle,
            info: Info,
            warning: AlertTriangle,
          }[t.type];

          // Theme styling
          const themeColors = {
            success: {
              border: "border-green-100",
              iconBg: "bg-green-50 text-green-600",
            },
            error: {
              border: "border-red-100",
              iconBg: "bg-red-50 text-red-600",
            },
            info: {
              border: "border-blue-100",
              iconBg: "bg-blue-50 text-blue-600",
            },
            warning: {
              border: "border-amber-100",
              iconBg: "bg-amber-50 text-amber-600",
            },
          }[t.type];

          return (
            <div
              key={t.id}
              className={`pointer-events-auto ${
                t.isExiting ? "animate-toast-out" : "animate-toast-in"
              }`}
            >
              {/* Clean flat toast card, no outer bezel, no border */}
              <div className="bg-white p-3.5 flex items-start gap-3 w-[340px] max-w-full shadow-[0_15px_40px_rgba(0,0,0,0.08)] rounded-xs transition-all duration-300">
                {/* Icon Wrapper */}
                <div className={`p-2 rounded-xs shrink-0 ${themeColors.iconBg}`}>
                  <Icon className="w-5 h-5" strokeWidth={1.5} />
                </div>

                {/* Content area */}
                <div className="flex-1 min-w-0 pt-0.5">
                  <p className="text-[13px] font-body font-semibold text-[#1C1C1C] leading-[1.5] break-words">
                    {t.message}
                  </p>
                </div>

                {/* Close button */}
                <button
                  onClick={() => removeToast(t.id)}
                  className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors shrink-0 cursor-pointer active:scale-90"
                  aria-label="Đóng thông báo"
                >
                  <X className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
