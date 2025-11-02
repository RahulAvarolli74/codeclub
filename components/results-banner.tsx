"use client"

import { useState, useEffect } from "react"
import { PartyPopper, XIcon } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"

export default function ResultsBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const [isHidden, setIsHidden] = useState(false)
  const router = useRouter()

  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Hide banner when scrolling down past 50px
      if (currentScrollY > 50 && currentScrollY > lastScrollY) {
        setIsHidden(true)
      } 
      // Show banner when scrolling back to top
      else if (currentScrollY < 50) {
        setIsHidden(false)
      }
      
      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    // Dispatch custom event to notify header
    window.dispatchEvent(new CustomEvent('bannerClosed'))
  }

  if (!isVisible) return null

  return (
    <div 
      className={`bg-gradient-to-r from-emerald-500/20 via-green-500/15 to-emerald-500/20 border-b border-emerald-500/30 px-4 py-2.5 text-foreground fixed top-0 w-full z-30 transition-transform duration-300 ${
        isHidden ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="flex items-center gap-2">
        <div className="flex grow items-center justify-center gap-2 md:gap-3">
          <p className="text-xs md:text-sm font-medium text-center">
            <span className="hidden md:inline">🎉 Results are out! Congratulations to all selected interns for CodeClub 2025-26</span>
            <span className="md:hidden">🎉 CodeClub 2025 Results Out!</span>
          </p>
          <Button 
            size="sm" 
            className="rounded-full text-xs md:text-sm h-7 md:h-8 px-3 md:px-4 shrink-0"
            onClick={() => router.push('/interns')}
          >
            View Results
          </Button>
        </div>
        <Button
          variant="ghost"
          className="group -my-1.5 -me-2 size-8 shrink-0 p-0 hover:bg-transparent"
          onClick={handleClose}
          aria-label="Close banner"
        >
          <XIcon
            size={16}
            className="opacity-60 transition-opacity group-hover:opacity-100"
            aria-hidden="true"
          />
        </Button>
      </div>
    </div>
  )
}
