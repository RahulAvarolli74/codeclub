"use client"

import { useState } from "react"
import { PartyPopper, XIcon } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"

export default function ResultsBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const router = useRouter()

  if (!isVisible) return null

  return (
    <div className="bg-gradient-to-r from-emerald-500/20 via-green-500/15 to-emerald-500/20 border-b border-emerald-500/30 px-4 py-3 text-foreground md:py-2">
      <div className="flex gap-2 md:items-center">
        <div className="flex grow gap-3 md:items-center md:justify-center">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <p className="text-sm font-medium">
              🎉 Results are out! Congratulations to all selected interns for CodeClub 2025-26
            </p>
            <div className="flex gap-2 max-md:flex-wrap">
              <Button 
                size="sm" 
                className="rounded-full"
                onClick={() => router.push('/interns')}
              >
                View Results
              </Button>
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          className="group -my-1.5 -me-2 size-8 shrink-0 p-0 hover:bg-transparent"
          onClick={() => setIsVisible(false)}
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
