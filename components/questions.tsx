"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, User, RefreshCw } from "lucide-react"
import { questions } from "@/data/questions"
import { CodeforcesConnect } from "./connect-codeforces"
import { useSession } from "next-auth/react"


export default function ProblemTracker() {
  const {data:session} = useSession()
  console.log("Session Data:", session?.user);
  
  const isCfHandleAvailable = session?.user?.cfHandle !== null
  
  const [activeFilter, setActiveFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [updatedQuestions, setUpdatedQuestions] = useState(questions)
  const itemsPerPage = 20

  // Fetch solved problems from backend
  const fetchSolvedProblems = async () => {
    if (!isCfHandleAvailable) return
    
    setIsRefreshing(true)
    try {
      const response = await fetch('/api/progress')
      if (response.ok) {
        const data = await response.json()
        // Update the questions with the latest completion status
        setUpdatedQuestions(data)
      } else {
        console.log('Failed to fetch solved problems')
      }
    } catch (error) {
      console.error('Error fetching solved problems:', error)
    } finally {
      setIsRefreshing(false)
    }
  }

  // Fetch solved problems on component mount if CF handle is available
  useEffect(() => {
    if (isCfHandleAvailable) {
      fetchSolvedProblems()
    }
  }, [isCfHandleAvailable])

  const getFilteredProblems = () => {
    // Use updated questions if CF handle is available, otherwise use original questions
    const questionsToUse = isCfHandleAvailable ? updatedQuestions : questions
    
    if (activeFilter === "level1") {
      return questionsToUse.filter((p) => p.level === 1)
    } else if (activeFilter === "level2") {
      return questionsToUse.filter((p) => p.level === 2)
    }
    
    return questionsToUse
  }

  const filteredProblems = getFilteredProblems()
  const totalPages = Math.ceil(filteredProblems.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentProblems = filteredProblems.slice(startIndex, endIndex)

  const completedCount = filteredProblems.filter((p) => p.completed).length
  const totalCount = filteredProblems.length
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  const getProgressTitle = () => {
    if (activeFilter === "level1") return "Level 1 Progress"
    if (activeFilter === "level2") return "Level 2 Progress"
    return "Overall Progress"
  }

  const handleFilterChange = (value:any) => {
    setActiveFilter(value)
    setCurrentPage(1)
  }

  const handlePageChange = (page:any) => {
    setCurrentPage(page)
  }

const Pagination = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if we're on the client side and set initial value
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile)
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = isMobile ? 3 : 5 // Fewer pages on mobile
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }
    return pages
  }

  return (
    <div className="flex items-center justify-center space-x-1 sm:space-x-2 py-4 w-full">
      <Button
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
        className="h-8 w-8 p-0 sm:h-9 sm:w-9"
      >
        <ChevronsLeft className="h-3 w-3 sm:h-4 sm:w-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="h-8 w-8 p-0 sm:h-9 sm:w-9"
      >
        <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
      </Button>
      
      {getPageNumbers().map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? "default" : "outline"}
          size="sm"
          onClick={() => handlePageChange(page)}
          className="h-8 w-8 p-0 sm:h-9 sm:w-9 text-xs sm:text-sm"
        >
          {page}
        </Button>
      ))}
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="h-8 w-8 p-0 sm:h-9 sm:w-9"
      >
        <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="h-8 w-8 p-0 sm:h-9 sm:w-9"
      >
        <ChevronsRight className="h-3 w-3 sm:h-4 sm:w-4" />
      </Button>
    </div>
  )
}

  return (
    <div className="min-h-screen p-3 sm:p-6">
      <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6">
        {/* Header Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Filter Tabs */}
          <Card>
            <CardHeader className="pb-2 px-4 sm:px-6">
              <CardTitle className="text-sm font-medium">Curated Problems</CardTitle>
              <CardDescription className="text-xs sm:text-sm">You can choose level</CardDescription>
            </CardHeader>
            <CardContent className="pt-0 px-4 sm:px-6">
              <Tabs value={activeFilter} onValueChange={handleFilterChange}>
                <TabsList className="grid w-full grid-cols-3 h-8 sm:h-10">
                  <TabsTrigger value="all" className="text-xs sm:text-sm">All Problems</TabsTrigger>
                  <TabsTrigger value="level1" className="text-xs sm:text-sm">Level 1 Only</TabsTrigger>
                  <TabsTrigger value="level2" className="text-xs sm:text-sm">Level 2 Only</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>

          {/* Progress Card - Only show if CF handle is available */}
          { (
            <Card>
              <CardHeader className="pb-2 px-4 sm:px-6">
                <CardTitle className="text-sm font-medium">{getProgressTitle()}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 px-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xl sm:text-2xl font-bold">
                      {completedCount}/{totalCount}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Problems Solved</div>
                  </div>
                  <div className="relative w-12 h-12 sm:w-16 sm:h-16">
                    <svg className="w-12 h-12 sm:w-16 sm:h-16 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="2"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2"
                        strokeDasharray={`${completionPercentage}, 100`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-semibold">{completionPercentage}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Problems Table */}
        <Card>
          <CardHeader className="px-4 sm:px-6">
            <div className="flex justify-between sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
              <div>
                <CardTitle className="text-base sm:text-lg">Problems</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Showing {startIndex + 1}-{Math.min(endIndex, totalCount)} of {totalCount} problems
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                {isCfHandleAvailable ? 
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={fetchSolvedProblems}
                      disabled={isRefreshing}
                      className="flex items-center gap-2 h-8 sm:h-9 text-xs sm:text-sm w-full sm:w-auto"
                    >
                      <RefreshCw className={`h-3 w-3 sm:h-4 sm:w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                      {isRefreshing ? 'Refreshing...' : 'Refresh'}
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2 bg-transparent h-8 sm:h-9 text-xs sm:text-sm w-full sm:w-auto">
                      <User className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="truncate max-w-24 sm:max-w-none">{session?.user?.cfHandle}</span>
                    </Button>
                  </div>
                  :<div className="w-full sm:w-auto">
                    <CodeforcesConnect />
                  </div>
                }
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 border-t-1">
            {/* Mobile Card View */}
            <div className="block sm:hidden">
              <div className="divide-y">
                {currentProblems.map((problem, index) => (
                  <div key={problem.id} className={`p-4 ${problem.completed ? "bg-emerald-300/20" : ""}`}>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1 min-w-0">
                        <a href={problem.href} target="_blank" rel="noopener noreferrer" className="block">
                          <div className="font-medium text-sm leading-tight pr-2">
                            {startIndex + index + 1}. {problem.name}
                          </div>
                        </a>
                      </div>
                      <div className="flex flex-col gap-1 ml-2">
                        <Badge variant={problem.level === 1 ? "secondary" : "outline"} className="text-xs whitespace-nowrap">
                          Level {problem.level}
                        </Badge>
                        <Badge variant={problem.completed ? "default" : "secondary"} className="text-xs whitespace-nowrap">
                          {problem.completed ? "Completed" : "Not Started"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden sm:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-6">Problem</TableHead>
                    <TableHead className="text-center">Level</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentProblems.map((problem, index) => (
                    <TableRow key={problem.id} className={problem.completed ? "bg-emerald-300/20" : ""}>
                      <TableCell className="font-medium cursor-pointer">
                        <a href={problem.href} target="_blank" rel="noopener noreferrer">
                          {startIndex + index + 1}. {problem.name}
                        </a>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant={problem.level === 1 ? "secondary" : "outline"} className="text-xs">
                          Level {problem.level}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant={problem.completed ? "default" : "secondary"} className="text-xs">
                          {problem.completed ? "Completed" : "Not Started"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <Pagination />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}