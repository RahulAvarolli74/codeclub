"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Heart } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Author {
  name: string;
  image: string;
}

interface BlogPostProps {
  title: string;
  content: string;
  author: Author;
  createdAt: string;
  likeCount: number;
  isLiked: boolean;
  blogId: string;
}

const BlogPost = ({ blogId }: { blogId: string }) => {
  const [blogData, setBlogData] = useState<BlogPostProps | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handleLike = async() => {
    setIsLiked((prev) => !prev);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    // Optional: POST to backend to sync like state
    try {
      const response = await axios.post<any>('/api/blog/like', { blogId })
      setIsLiked(response.data.isLiked);
      if(!response.data) {
        setIsLiked((prev) => !prev);
        setLikeCount((prev) => (isLiked ? prev + 1 : prev - 1));
      }
    } catch (error) {
      setIsLiked((prev) => !prev);
      setLikeCount((prev) => (isLiked ? prev + 1 : prev - 1));
    }
  };

  const fetchBlogPost = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get<any>(`/api/blog/${blogId}`);
      const data = response.data;
      setBlogData(data);
      setIsLiked(data.isLiked);
      setLikeCount(data.likeCount);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      toast.error("Failed to load blog post.");
    } finally {
      setIsLoading(false);
    }
  }, [blogId]);

  useEffect(() => {
    fetchBlogPost();
  }, [fetchBlogPost, blogId]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen">
      <main className="max-w-4xl mx-auto px-4 py-8">
        <article className="max-w-3xl mx-auto">
          {/* Title */}
          {isLoading ? (
            <Skeleton className="h-10 w-3/4 mb-6" />
          ) : (
            <h1 className="text-4xl font-bold mb-6 leading-tight">
              {blogData?.title}
            </h1>
          )}

          {/* Author and Date */}
          <div className="flex items-center space-x-4 mb-8 pb-6 border-b border-muted">
            {isLoading ? (
              <div className="flex items-center gap-4">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="space-y-2 my-3">
                  <Skeleton className="w-32 h-4" />
                  <Skeleton className="w-24 h-3" />
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={blogData?.author.image}
                    alt={blogData?.author.name}
                  />
                  <AvatarFallback>
                    {blogData?.author.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{blogData?.author.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {formatDate(blogData?.createdAt || "")}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Blog Content */}
          {isLoading ? (
            <div className="space-y-4 mt-3">
              {Array.from({ length: 15 }).map((_, idx) => (
                <Skeleton
                  key={idx}
                  className={`h-5 ${
                    idx % 4 === 0
                      ? "w-5/6"
                      : idx % 3 === 0
                      ? "w-3/4"
                      : "w-full"
                  }`}
                />
              ))}
            </div>
          ) : (
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: blogData?.content || "" }}
              style={{
                lineHeight: "1.75",
                fontSize: "1.125rem",
              }}
            />
          )}

          {/* Like Section */}
          {!isLoading && (
            <div className="mt-12 pt-8 border-t border-muted">
              <div className="flex items-center justify-between">
                <button
                  onClick={handleLike}
                  className="flex items-center space-x-2 group"
                >
                  <Heart
                    className={`w-6 h-6 transition-colors ${
                      isLiked
                        ? "fill-red-500 text-red-500"
                        : "text-muted-foreground group-hover:text-red-500"
                    }`}
                  />
                  <span className="text-muted-foreground group-hover:text-red-500">
                    {likeCount}
                  </span>
                </button>
              </div>
            </div>
          )}
        </article>
      </main>
    </div>
  );
};

export default BlogPost;
