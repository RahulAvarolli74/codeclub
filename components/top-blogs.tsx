"use client"
import { MessageSquare, ChevronUp, TrendingUp, SquarePen, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import axios from "axios"
import { Skeleton } from "./ui/skeleton"

interface Post {
  id: string
  title: string
  content: string
  authorId: string
  author: {
    id: string
    name: string
    image: string
  }
  likeCount: number
  createdAt: string
  updatedAt: string
  isLiked: boolean
}

// Helper function to strip HTML tags from content
const stripHtml = (html: string) => {
  const tmp = document.createElement("DIV")
  tmp.innerHTML = html
  return tmp.textContent || tmp.innerText || ""
}

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
  
  if (diffInHours < 1) {
    return "just now"
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`
  } else {
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
  }
}

export default function TopBlogs() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const handleLike = async (blogId: string, currentIsLiked: boolean) => {
    try {
      const response = await axios.post('/api/blog/like', { blogId })
      
      if (response.status === 200) {
        // Update the posts state to reflect the like/unlike
        setPosts(prevPosts => 
          prevPosts.map(post => 
            post.id === blogId 
              ? { 
                  ...post, 
                  isLiked: !currentIsLiked,
                  likeCount: currentIsLiked ? post.likeCount - 1 : post.likeCount + 1
                }
              : post
          )
        )
      }
    } catch (err) {
      console.error('Error toggling like:', err)
    }
  }

const fetchPosts =useCallback( async () => {
    try {
      setLoading(true)
      const response = await axios.get<Post[]>('/api/blog/all')
      console.log(response.data)
      
      // Sort by likeCount in descending order and take top 3
      const sortedPosts = response.data
        .sort((a, b) => b.likeCount - a.likeCount)
        .slice(0, 3)
      
      setPosts(sortedPosts)
      setError(null)
    } catch (err) {
      console.error('Error fetching posts:', err)
      setError('Failed to load posts')
    } finally {
      setLoading(false)
    }
  },[])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  if (loading) {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-8 flex items-center justify-between">
        <Button variant="ghost" className="flex items-center gap-2 text-orange-400 hover:text-orange-300 p-0">
          <TrendingUp className="w-5 h-5" />
          <span className="text-lg font-medium">Most Popular Blogs</span>
        </Button>
        <Link href="/blogs/new" className="flex gap-2 items-center text-sm text-muted-foreground hover:underline">
          <SquarePen className="w-4 h-4" />
          Write
        </Link>
      </div>

      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="rounded-xl">
            <CardContent className="p-6 flex gap-4">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="flex-1 space-y-3">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <div className="flex gap-6 pt-2">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-12" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

  if (error) {
    return (
      <div className="max-w-5xl mx-auto p-6">
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
        <div className="text-center py-8">
          <p className="text-red-500">{error}</p>
          <Button 
            onClick={() => window.location.reload()} 
            className="mt-4"
            variant="outline"
          >
            Try Again
          </Button>
        </div>
      </div>
    )
  }

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
          {posts.length > 0 ? (
            posts.map((post) => (
              <Card key={post.id} className="rounded-xl p-6">
                <div className="flex gap-4">
                  <Avatar className="w-10 h-10 flex-shrink-0">
                    <AvatarImage src={post.author.image} alt={post.author.name} />
                    <AvatarFallback>
                      {post.author.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-neutral-400 text-sm font-medium">{post.author.name}</span>
                      <span className="text-neutral-600">•</span>
                      <span className="text-neutral-500 text-sm">{formatDate(post.createdAt)}</span>
                    </div>

                    <Link href={`/blogs/${post.id}`} className="font-semibold text-lg mb-3 leading-tight">{post.title}</Link>

                    <p className="text-neutral-400 text-sm leading-relaxed mb-4 line-clamp-2">
                      {stripHtml(post.content)}
                    </p>

                    <div className="flex items-center gap-6">
                      <button
                        onClick={()=>handleLike(post.id, post.isLiked)}
                        className="flex items-center space-x-2 group"
                      >
                        <Heart
                          className={`w-4 h-4 transition-colors ${
                            post.isLiked
                              ? "fill-red-500 text-red-500"
                              : "text-muted-foreground group-hover:text-red-500"
                          }`}
                        />
                        <span className="text-muted-foreground group-hover:text-red-500">
                          {post.likeCount}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-neutral-500">No posts available yet.</p>
              <Link href="/blogs/new" className="text-orange-400 hover:text-orange-300 mt-2 inline-block">
                Write the first post!
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}