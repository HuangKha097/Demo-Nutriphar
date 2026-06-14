import { ChevronLeft, ChevronRight } from "lucide-react";

interface SliderNavigationProps {
  onPrev: () => void;
  onNext: () => void;
  variant?: "light" | "dark";
  className?: string;
}

export function SliderNavigation({
  onPrev,
  onNext,
  variant = "light",
  className = "",
}: SliderNavigationProps) {
  const baseStyle =
    "absolute z-20 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer opacity-0 group-hover:opacity-100 md:opacity-0 max-md:opacity-100 shadow-md rounded-full";

  const themeStyles = {
    light: "bg-white/80 hover:bg-white text-gray-800 border border-gray-100 hover:text-primary",
    dark: "bg-black/20 hover:bg-black/55 text-white backdrop-blur-xs",
  };

  const layoutStyle = className || "top-1/2 -translate-y-1/2 w-10 h-10";

  return (
    <>
      <button
        onClick={onPrev}
        className={`${baseStyle} ${themeStyles[variant]} left-4 ${layoutStyle}`}
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={onNext}
        className={`${baseStyle} ${themeStyles[variant]} right-4 ${layoutStyle}`}
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </>
  );
}
