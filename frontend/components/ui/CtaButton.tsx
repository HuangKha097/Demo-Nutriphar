import { forwardRef, ReactNode } from "react";

export interface CtaButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  iconWrapperClassName?: string;
}

export const CtaButton = forwardRef<HTMLButtonElement, CtaButtonProps>(
  ({ className = "", children, icon, iconWrapperClassName = "w-9 h-9", ...props }, ref) => {
    const hasBg = className.includes("bg-");
    const bgClasses = hasBg ? "" : "bg-primary hover:bg-[#12224F]";

    const hasPadding = className.includes("p-") || className.includes("pl-") || className.includes("pr-") || className.includes("px-") || className.includes("py-");
    const paddingClasses = hasPadding ? "" : "pl-8 pr-2 py-1.5";

    return (
      <button
        ref={ref}
        className={`group flex items-center justify-between ${paddingClasses} ${bgClasses} text-white font-medium text-[15px] rounded-full shadow-md hover:shadow-lg hover:brightness-110 hover:opacity-95 transition-all duration-300 active:scale-[0.98] select-none cursor-pointer disabled:opacity-50 disabled:pointer-events-none ${className}`}
        {...props}
      >
        <span className="font-body">{children}</span>
        {icon && (
          <div className={`${iconWrapperClassName} rounded-full bg-white/20 flex items-center justify-center ml-4 group-hover:translate-x-1 transition-transform duration-300 shrink-0`}>
            {icon}
          </div>
        )}
      </button>
    );
  }
);

CtaButton.displayName = "CtaButton";
