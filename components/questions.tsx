"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { allProblems } from "@/constants/questions"
import { CodeforcesConnect } from "./connect-codeforces"


export default function ProblemTracker() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20

  const getFilteredProblems = () => {
    if (activeFilter === "level1") {
      return allProblems.filter((p) => p.level === 1)
    }
    if (activeFilter === "level2") {
      return allProblems.filter((p) => p.level === 2)
    }
    return allProblems
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
    setCurrentPage(1) // Reset to first page when filter changes
  }

  const handlePageChange = (page:any) => {
    setCurrentPage(page)
  }

  const Pagination = () => {
    const getPageNumbers = () => {
      const pages = []
      const maxVisiblePages = 5
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
      <div className="flex items-center justify-center space-x-2 py-4 max-w-6xl">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        {getPageNumbers().map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            size="sm"
            onClick={() => handlePageChange(page)}
            className="min-w-[40px]"
          >
            {page}
          </Button>
        ))}
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6 ">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Filter Tabs - spans 2 columns */}
          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Curated Problems</CardTitle>
              <CardDescription>You can choose level</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Tabs value={activeFilter} onValueChange={handleFilterChange}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all">All Problems</TabsTrigger>
                  <TabsTrigger value="level1">Level 1 Only</TabsTrigger>
                  <TabsTrigger value="level2">Level 2 Only</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>

          {/* Progress Card - spans 1 column */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{getProgressTitle()}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">
                    {completedCount}/{totalCount}
                  </div>
                  <div className="text-sm text-muted-foreground">Problems Solved</div>
                </div>
                <div className="relative w-16 h-16">
                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
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
        </div>

        {/* Problems Table */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-lg">Problems</CardTitle>
                <CardDescription>
                  Showing {startIndex + 1}-{Math.min(endIndex, totalCount)} of {totalCount} problems
                </CardDescription>
              </div>
              <div>
                <div>
                  <CodeforcesConnect />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 border-t-1">
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
                      <a href="https://codeforces.com/problemset/problem/1/A" target="_blank" rel="noopener noreferrer">
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
            <Pagination />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}