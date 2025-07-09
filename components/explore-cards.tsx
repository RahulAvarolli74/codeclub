import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function Component() {
  const courses = [
    {
      title: "Coding Challenges",
      subtitle: "Level-based curated problems for practice",
      gradient: "from-indigo-500 via-purple-500 to-blue-600",
      href:"/problems",
      decorativeElements: (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-12 right-16 w-20 h-20 bg-white/15 rounded-full"></div>
          <div className="absolute top-20 right-24 w-12 h-12 bg-white/10 rounded-full"></div>
          <div className="absolute top-6 right-6 w-8 h-8 bg-white/20 rounded-full"></div>
          <div className="absolute bottom-16 left-12 w-16 h-16 bg-white/12 rounded-full"></div>
          <div className="absolute bottom-24 left-20 w-10 h-10 bg-white/8 rounded-full"></div>
          <div className="absolute top-1/2 left-8 w-6 h-6 bg-white/15 rounded-full"></div>
          <div className="absolute bottom-8 right-1/3 w-14 h-14 bg-white/10 rounded-full"></div>
        </div>
      ),
    },
    {
      title: "Read, Learn, Contribute",
      subtitle: "Insights, writeups, and stories by club members",
      gradient: "from-emerald-700 via-green-600 to-teal-700",
      href:"/blogs",
      decorativeElements: (
        <div className="absolute inset-0 overflow-hidden">
          {/* Network/grid pattern */}
          <div className="absolute inset-0">
            <svg className="w-full h-full opacity-20" viewBox="0 0 200 150">
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          {/* Connected nodes */}
          <div className="absolute top-8 right-12 w-4 h-4 bg-white/40 rounded-full"></div>
          <div className="absolute top-16 right-20 w-3 h-3 bg-white/30 rounded-full"></div>
          <div className="absolute bottom-12 left-16 w-4 h-4 bg-white/35 rounded-full"></div>
          <div className="absolute bottom-20 left-8 w-3 h-3 bg-white/25 rounded-full"></div>
          {/* Connection lines */}
          <div className="absolute top-10 right-14 w-8 h-px bg-white/25 rotate-45"></div>
          <div className="absolute bottom-16 left-12 w-6 h-px bg-white/20 -rotate-12"></div>
        </div>
      ),
    },
    {
      title: "Contests, Hunts & More",
      subtitle: "From CodeCrafters to Tech Hunt, we host it all",
      href:"/events",
      gradient: "from-orange-400 via-red-400 to-pink-400",
      decorativeElements: (
        <div className="absolute inset-0 overflow-hidden">
          {/* Curved flowing lines */}
          <div className="absolute top-8 right-8">
            <svg width="120" height="80" viewBox="0 0 120 80" className="opacity-30">
              <path d="M10,40 Q60,10 110,40 T210,40" stroke="white" strokeWidth="2" fill="none" />
              <path d="M0,50 Q50,20 100,50 T200,50" stroke="white" strokeWidth="1.5" fill="none" opacity="0.7" />
            </svg>
          </div>
          {/* Circular elements */}
          <div className="absolute bottom-12 left-8 w-16 h-16 border-2 border-white/20 rounded-full"></div>
          <div className="absolute bottom-16 left-12 w-8 h-8 border border-white/15 rounded-full"></div>
          <div className="absolute top-1/2 right-1/4 w-6 h-6 bg-white/20 rounded-full"></div>
          <div className="absolute top-6 left-1/3 w-4 h-4 bg-white/15 rounded-full"></div>
        </div>
      ),
    },
  ]

  return (
    <div className="p-4 md:p-8 ">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <Card key={index} className="relative overflow-hidden border-0 shadow-xl rounded-2xl p-0">
              <div className={`relative h-48 bg-gradient-to-br ${course.gradient} p-5 text-white rounded-2xl`}>
                {course.decorativeElements}

                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="space-y-2">
                    {course.subtitle && (
                      <p className="text-xs font-medium opacity-80 tracking-wide uppercase">{course.subtitle}</p>
                    )}
                    <h2 className="text-xl font-semibold leading-snug max-w-[85%]">{course.title}</h2>
                  </div>

                  <div className="flex justify-end">
                    <Link href={course.href}>
                      <Button
                        size="icon"
                        className="w-12 h-12 bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white hover:scale-105 transition-all duration-200 rounded-full shadow-lg border-0"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
