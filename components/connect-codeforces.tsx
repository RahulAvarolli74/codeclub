"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BadgePlus, Copy } from "lucide-react"
import { useState } from "react"

export function CodeforcesConnect() {
  const [handle, setHandle] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Connecting handle:", handle)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <BadgePlus />
          Connect Codeforces
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Connect Codeforces Handle</DialogTitle>
        </DialogHeader>

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
              No account? <a href="#" className="text-blue-500 hover:underline">Create one</a>
            </p>
          </div>

          <div className=" border border-blue-200 rounded-lg p-3 space-y-2">
            <h3 className="text-sm font-medium ">Quick Verification</h3>
            <div className="text-xs  space-y-1">
              <p>1. Go to <a href="https://codeforces.com/problemset/problem/4/A" target="_blank" className="text-blue-500 underline" rel="noreferrer">Problem 4/A</a></p>
              <p>2. Submit this code (expect Compilation Error):</p>
              <div className="bg-white dark:border-black border-1 text-black rounded p-2 relative mt-1">
                <code className="text-xs">//verify me</code>
              </div>
              <p>3. Click Connect below after compilation error</p>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleSubmit} className="w-full" disabled={!handle}>
              Connect
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}