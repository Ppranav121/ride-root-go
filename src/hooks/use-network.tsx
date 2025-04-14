
import * as React from "react"
import { toast } from "sonner"

export function useNetworkStatus() {
  const [isOnline, setIsOnline] = React.useState<boolean>(() => {
    // Initialize from navigator if available
    return typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean' 
      ? navigator.onLine 
      : true
  })

  React.useEffect(() => {
    // Safety check for SSR
    if (typeof window === 'undefined') return;
    
    const handleOnline = () => {
      setIsOnline(true)
      toast.success("You're back online", {
        description: "Your connection has been restored"
      })
    }
    
    const handleOffline = () => {
      setIsOnline(false)
      toast.error("You're offline", {
        description: "Please check your connection"
      })
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
