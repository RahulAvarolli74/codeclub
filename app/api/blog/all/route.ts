import { auth } from "@/auth";
import db from "@/lib/db";
import { NextResponse } from "next/server";

// Ensure this API route runs in Node.js runtime
export const runtime = 'nodejs';

export async function GET() {
  const session = await auth();

  const user = session?.user;
  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    // Get user from DB
    const dbUser = await db.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        id: true,
      },
    });

    if (!dbUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Fetch all blogs
    const blogs = await db.blog.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    // Fetch all blogIds liked by this user
    const likedBlogIds = await db.like.findMany({
      where: {
        userId: dbUser.id,
      },
      select: {
        blogId: true,
      },
    });

    const likedIdsSet = new Set(likedBlogIds.map((like) => like.blogId));

    // Add isLiked flag
    const blogsWithIsLiked = blogs.map((blog) => ({
      ...blog,
      isLiked: likedIdsSet.has(blog.id),
    }));

    return NextResponse.json(blogsWithIsLiked, { status: 200 });
    
  } catch (error) {
    console.error("Error fetching blogs with isLiked:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
