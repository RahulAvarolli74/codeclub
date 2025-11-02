"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BadgePlus, Copy, User } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import axios from "axios"
import { useRouter } from "next/navigation"

export function CodeforcesConnect() {
  const [handle, setHandle] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await axios.post("/api/verify", { cfHandle: handle })
      if (response.status === 200) {
        setIsOpen(false)
        toast.success(`Codeforces handle "${handle}" verified successfully!`)
        setHandle("") 
        window.location.reload()
      } else {
        toast.error("Failed to connect handle. Please try again.")
      }
    } catch (error) {
      toast.error("An error occurred while verifying your handle.")
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <BadgePlus className="h-4 w-4 mr-2" />
          Connect Codeforces
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Connect Codeforces Handle</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="handle">Codeforces Handle</Label>
              <Input
                id="handle"
                placeholder="Enter your handle (it's case-sensitive)"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                No account?{" "}
                <a
                  href="https://codeforces.com/register"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Create one
                </a>
              </p>
            </div>
            <div className="border border-blue-200 rounded-lg p-3 space-y-2">
              <h3 className="text-sm font-medium">Quick Verification</h3>
              <div className="text-xs space-y-1">
                <p>
                  1. Go to{" "}
                  <a
                    href="https://codeforces.com/problemset/problem/4/A"
                    target="_blank"
                    className="text-blue-500 underline"
                    rel="noreferrer"
                  >
                    Problem 4/A
                  </a>
                </p>
                <p>2. Submit this code (expect Compilation Error):</p>
                <div className="bg-muted rounded p-2 relative mt-1 flex items-center justify-between">
                  <code className="text-xs font-mono">//verify me</code>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => {
                      navigator.clipboard.writeText("//verify me")
                      toast.success("Code copied to clipboard")
                    }}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
                <p>3. Click Connect below after compilation error</p>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full" disabled={!handle || isLoading}>
                {isLoading ? "Verifying..." : "Connect"}
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
