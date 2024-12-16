"use client";

import { useEffect, useState, useCallback } from "react";

interface MobileMenuBarProps {
  children: React.ReactNode;
  className?: string;
}

export default function MobileMenuBar({ children, className }: MobileMenuBarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsTyping(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsTyping(false);
  }, []);

  const handleScroll = useCallback(() => {
    if (!isTyping) {
      const currentScrollY = window.scrollY;

      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    }
  }, [lastScrollY, scrollTimeout, isTyping]);

  useEffect(() => {
    // Use a more specific selector to target only visible inputs
    const inputs = document.querySelectorAll('input:not([type="hidden"]), textarea');
    
    // Add listeners with a slight delay to ensure DOM is ready
    setTimeout(() => {
      inputs.forEach(input => {
        input.addEventListener('focus', handleInputFocus);
        input.addEventListener('blur', handleInputBlur);
      });
    }, 100);

    window.addEventListener("scroll", handleScroll);

    return () => {
      inputs.forEach(input => {
        input.removeEventListener('focus', handleInputFocus);
        input.removeEventListener('blur', handleInputBlur);
      });
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
}, [handleScroll, scrollTimeout, handleInputFocus, handleInputBlur]);
  // If typing, return null to completely remove from DOM
  if (isTyping) {
    return null;
  }

  // Only show when not typing
  return (
    <div
      className={`${className} fixed bottom-0 left-0 right-0 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ display: isTyping ? 'none' : 'block' }}
    >
      {children}
    </div>
  );
}