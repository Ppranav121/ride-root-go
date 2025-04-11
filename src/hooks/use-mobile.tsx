
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(() => {
    // Initial check on client-side
    if (typeof window !== 'undefined') {
      return window.innerWidth < MOBILE_BREAKPOINT;
    }
    // Default to false for server-side rendering
    return false;
  });

  React.useEffect(() => {
    // Safety check for SSR
    if (typeof window === 'undefined') return;
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    
    // Add event listener
    window.addEventListener('resize', checkMobile);
    
    // Initial check
    checkMobile();
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}

export function useTouchDevice() {
  const [isTouch, setIsTouch] = React.useState<boolean>(false);
  
  React.useEffect(() => {
    // Check if device supports touch
    const isTouchDevice = 
      'ontouchstart' in window || 
      navigator.maxTouchPoints > 0 ||
      (navigator as any).msMaxTouchPoints > 0;
      
    setIsTouch(isTouchDevice);
  }, []);
  
  return isTouch;
}
