import { auth } from "@/auth";
import db from "@/lib/db";

export async function GET(_: Request, { params }: { params: Promise<{ blogId: string }> }) {
    const { blogId } = await params;
    const session = await auth();
    if (!session?.user?.cfHandle) {
        return new Response("Unauthorized", { status: 401 });
    }
    try {
        const blog = await db.blog.findUnique({
            where: {
                id: blogId,
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                    }
                }
            }
        });

        if (!blog) {
            return new Response("Blog post not found", { status: 404 });
        }

        const isLikedByUser = await db.like.findFirst({
            where: {
                blogId: blog.id,
                userId: session.user.id,
            }
        });

        return new Response(JSON.stringify({
            ...blog,
            isLiked: !!isLikedByUser,
        }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });


    } catch (error) {
        console.log("Error fetching blog post:", error);
        return new Response("Internal Server Error", { status: 500 });
    }

}