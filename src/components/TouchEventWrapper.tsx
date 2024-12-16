"use client";

interface TouchEventWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function TouchEventWrapper({ children, className }: TouchEventWrapperProps) {
  const preventDefaultTouch = (e: React.TouchEvent) => {
    e.preventDefault();
  };

  return (
    <div 
      className={className}
      onTouchStart={preventDefaultTouch}
      onTouchMove={preventDefaultTouch}
    >
      {children}
    </div>
  );
}