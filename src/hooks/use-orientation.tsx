
import * as React from "react"

type OrientationType = "portrait" | "landscape" | "unknown";

export function useDeviceOrientation() {
  const [orientation, setOrientation] = React.useState<OrientationType>(() => {
    // Initialize from screen if available
    if (typeof window !== 'undefined' && window.screen && window.screen.orientation) {
      return window.screen.orientation.type.includes('portrait') ? 'portrait' : 'landscape';
    }
    
    return 'unknown';
  });

  React.useEffect(() => {
    // Safety check for SSR
    if (typeof window === 'undefined') return;
    
    const updateOrientation = () => {
      if (window.screen && window.screen.orientation) {
        // Modern API
        setOrientation(
          window.screen.orientation.type.includes('portrait') ? 'portrait' : 'landscape'
        );
      } else if (window.matchMedia) {
        // Fallback to matchMedia for older browsers
        const isPortrait = window.matchMedia('(orientation: portrait)').matches;
        setOrientation(isPortrait ? 'portrait' : 'landscape');
      }
    };
    
    // Check orientation on window resize
    window.addEventListener('resize', updateOrientation);
    
    // For devices with orientation change event
    if (typeof window.screen !== 'undefined' && window.screen.orientation) {
      window.screen.orientation.addEventListener('change', updateOrientation);
    } else {
      window.addEventListener('orientationchange', updateOrientation);
    }
    
    // Initial check
    updateOrientation();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', updateOrientation);
      
      if (typeof window.screen !== 'undefined' && window.screen.orientation) {
        window.screen.orientation.removeEventListener('change', updateOrientation);
      } else {
        window.removeEventListener('orientationchange', updateOrientation);
      }
    };
  }, []);

  return orientation;
}
