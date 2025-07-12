import { auth } from "@/auth";
import db from "@/lib/db";

export async function GET() {
  const session = await auth();

  const user = session?.user;
  if (!user?.cfHandle) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    // Get user from DB
    const dbUser = await db.user.findUnique({
      where: {
        cfHandle: user.cfHandle,
      },
      select: {
        id: true,
      },
    });

    if (!dbUser) {
      return new Response("User not found", { status: 404 });
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

    return new Response(JSON.stringify(blogsWithIsLiked), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching blogs with isLiked:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
