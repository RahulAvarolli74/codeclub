import { MessageSquare, Eye, ChevronUp, TrendingUp, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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
      views: 171,
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
      views: 379,
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
      views: 80,
      comments: 0,
    },
    {
      id: 4,
      user: "Anonymous User",
      timestamp: "an hour ago",
      title: "Another Post",
      content: "This is another post with some content.",
      votes: 15,
      views: 120,
      comments: 3,
    },
  ]
    .sort((a, b) => b.votes - a.votes)
    .slice(0, 3)

  return (
    <div className="">
      <div className="max-w-6xl mx-auto p-6">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-6 mb-8">
          <Button variant="ghost" className="flex items-center gap-2 text-orange-400 hover:text-orange-300">
            <TrendingUp className="w-4 h-4" />
            Most Popular Blogs
          </Button>
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="border-b border-neutral-600 pb-6 last:border-b-0">
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 flex-shrink-0">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>AU</AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-neutral-400 text-sm">{post.user}</span>
                    <span className="text-neutral-500 text-sm">•</span>
                    <span className="text-neutral-500 text-sm">{post.timestamp}</span>
                  </div>

                  <h3 className=" font-medium text-lg mb-3 leading-tight">{post.title}</h3>

                  <p className="text-neutral-500 text-sm leading-relaxed mb-4 line-clamp-3">{post.content}</p>

                  <div className="flex items-center gap-6 text-neutral-500">
                    <div className="flex items-center gap-1">
                      <ChevronUp className="w-4 h-4" />
                      <span className="text-sm">{post.votes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">{post.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-sm">{post.comments}</span>
                    </div>
                  </div>
                </div>

                <Button variant="ghost" size="sm" className="text-neutral-500 hover:text-neutral-400 self-start">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
