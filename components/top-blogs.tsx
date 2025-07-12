import { MessageSquare, ChevronUp, TrendingUp, SquarePen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function TopBlogs() {
  const posts = [
    {
      id: 1,
      user: "Anonymous User",
      timestamp: "an hour ago",
      title: "Atlassian P40 | Ghosted after all round",
      content:
        "Karate Round -> 5 system design question, word search problem Coding Round -> Employee Hirarchy Code Design Round -> Rating System, get aggregated rating System Design -> Similar to twitter feed Managerial Rounds -> Normal Managerial...",
      votes: 10,
      comments: 2,
    },
    {
      id: 2,
      user: "Anonymous User",
      timestamp: "2 hours ago",
      title: "Amazon Interview Tips",
      content:
        "My interview is scheduled from 11 July, the exact date is not provided. There will be 3 rounds two technical and one bar raiser. I have gone through their leadership principles, and I know basics of low level design like strategy, and decorator, and",
      votes: 5,
      comments: 6,
    },
    {
      id: 3,
      user: "Anonymous User",
      timestamp: "an hour ago",
      title: "Need some clarity",
      content:
        "FRIST TWO PARAGRAPHS ARE ME CRYING ABOUT THE THING THAT I FOUND UNREASONABLE BUT HAVE TO FOLLOW THEM BUT WHAT I ACTUALLY NEED IS ON THIRD PARAGRAPH.As the placement season has started companies will start recruiting...",
      votes: 20,
      comments: 0,
    },
    {
      id: 4,
      user: "Anonymous User",
      timestamp: "an hour ago",
      title: "Another Post",
      content: "This is another post with some content.",
      votes: 15,
      comments: 3,
    },
  ]
    .sort((a, b) => b.votes - a.votes)
    .slice(0, 3)

  return (
    <div className="">
      <div className="max-w-5xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <Button variant="ghost" className="flex items-center gap-2 text-orange-400 hover:text-orange-300 p-0">
            <TrendingUp className="w-5 h-5" />
            <span className="text-lg font-medium">Most Popular Blogs</span>
          </Button>
          <Link href="/blogs/new" className="flex gap-2">
            <SquarePen />
              Write
          </Link>
        </div>

        {/* Posts */}
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="rounded-xl p-6">
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 flex-shrink-0">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>AU</AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-neutral-400 text-sm font-medium">{post.user}</span>
                    <span className="text-neutral-600">•</span>
                    <span className="text-neutral-500 text-sm">{post.timestamp}</span>
                  </div>

                  <h3 className="font-semibold text-lg mb-3 leading-tight">{post.title}</h3>

                  <p className="text-neutral-400 text-sm leading-relaxed mb-4 line-clamp-2">{post.content}</p>

                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-neutral-500 cursor-pointer">
                      <ChevronUp className="w-4 h-4" />
                      <span className="text-sm font-medium">{post.votes}</span>
                    </div>

                    <div className="flex items-center gap-2 text-neutral-500 cursor-pointer">
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-sm font-medium">{post.comments}</span>
                    </div>
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
