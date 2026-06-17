"use client";

import { forwardRef, ReactNode, useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

export interface CtaButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  iconWrapperClassName?: string;
  preventSpamTimeout?: number; // Timeout in ms to prevent spam clicks. Default 1500ms.
}

export const CtaButton = forwardRef<HTMLButtonElement, CtaButtonProps>(
  ({ className = "", children, icon, iconWrapperClassName = "w-9 h-9", preventSpamTimeout = 1500, onClick, ...props }, ref) => {
    const [isSpamLocked, setIsSpamLocked] = useState(false);

    useEffect(() => {
      let timeoutId: NodeJS.Timeout;
      if (isSpamLocked) {
        timeoutId = setTimeout(() => {
          setIsSpamLocked(false);
        }, preventSpamTimeout);
      }
      return () => clearTimeout(timeoutId);
    }, [isSpamLocked, preventSpamTimeout]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isSpamLocked || props.disabled) {
        e.preventDefault();
        return;
      }
      
      setIsSpamLocked(true);
      
      if (onClick) {
        onClick(e);
      }
    };

    const hasBg = className.includes("bg-");
    const bgClasses = hasBg ? "" : "bg-primary hover:bg-[#12224F]";

    const hasPadding = className.includes("p-") || className.includes("pl-") || className.includes("pr-") || className.includes("px-") || className.includes("py-");
    const paddingClasses = hasPadding ? "" : "pl-8 pr-2 py-1.5";

    const spamLockClass = isSpamLocked ? "pointer-events-none opacity-80" : "";

    return (
      <button
        ref={ref}
        onClick={handleClick}
        className={`group/cta flex items-center justify-between ${paddingClasses} ${bgClasses} ${spamLockClass} text-white font-medium text-[15px] rounded-full shadow-md hover:shadow-lg hover:brightness-110 hover:opacity-95 transition-all duration-300 active:scale-[0.98] select-none cursor-pointer disabled:opacity-50 disabled:pointer-events-none ${className}`}
        {...props}
      >
        <span className="font-body">{children}</span>
        {(icon || isSpamLocked) && (
          <div className={`${iconWrapperClassName} rounded-full bg-white/20 flex items-center justify-center ml-4 ${!isSpamLocked ? "group-hover/cta:translate-x-1" : ""} transition-transform duration-300 shrink-0`}>
            {isSpamLocked ? (
              <Loader2 className="w-4 h-4 text-white animate-spin" />
            ) : (
              icon
            )}
          </div>
        )}
      </button>
    );
  }
);

CtaButton.displayName = "CtaButton";
