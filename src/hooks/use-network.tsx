
import * as React from "react"
import { toast } from "sonner"

export function useNetworkStatus() {
  const [isOnline, setIsOnline] = React.useState<boolean>(() => {
    // Initialize from navigator if available
    return typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean' 
      ? navigator.onLine 
      : true
  })

  // Use a ref to prevent duplicate toasts
  const hasShownOfflineToast = React.useRef(false);
  const hasShownOnlineToast = React.useRef(false);
  
  React.useEffect(() => {
    // Safety check for SSR
    if (typeof window === 'undefined') return;
    
    const handleOnline = () => {
      setIsOnline(true)
      if (!hasShownOnlineToast.current) {
        toast.success("You're back online", {
          description: "Your connection has been restored"
        })
        hasShownOnlineToast.current = true;
        hasShownOfflineToast.current = false;
      }
    }
    
    const handleOffline = () => {
      setIsOnline(false)
      if (!hasShownOfflineToast.current) {
        toast.error("You're offline", {
          description: "Please check your connection"
        })
        hasShownOfflineToast.current = true;
        hasShownOnlineToast.current = false;
      }
    }
    
    // Add event listeners
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    
    // Initial check
    setIsOnline(navigator.onLine)
    
    // Cleanup
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return {
    isOnline,
    networkType: typeof navigator !== 'undefined' && 'connection' in navigator 
      ? (navigator as any).connection?.effectiveType 
      : 'unknown'
  }
}
