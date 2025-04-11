
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

// New hook to detect if system fonts are loaded
export function useFontsLoaded() {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);
  
  React.useEffect(() => {
    // If the browser supports the Font Loading API
    if ('fonts' in document) {
      Promise.all([
        (document as any).fonts.load('1em Poppins'),
        (document as any).fonts.load('1em Montserrat')
      ]).then(() => {
        setFontsLoaded(true);
      }).catch(() => {
        // Fallback in case font loading fails
        setTimeout(() => setFontsLoaded(true), 1000);
      });
    } else {
      // Fallback for browsers that don't support the Font Loading API
      setTimeout(() => setFontsLoaded(true), 1000);
    }
  }, []);
  
  return fontsLoaded;
}
