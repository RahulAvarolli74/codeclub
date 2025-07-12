import { auth } from "@/auth";
import db from "@/lib/db";


export async function POST(request:Request){
    const session = await auth();
    if(!session?.user) {
        return new Response("Unauthorized", { status: 401 });
    }
    try {
        const {blogId} = await request.json();
        if (!blogId) {
            return new Response("Blog ID is required", { status: 400 });
        }
        // Check if the user has already liked this blog
        const existingLike = await db.like.findFirst({
            where: {
                blogId,
                userId: session.user.id,
            },
        });

        if(existingLike) {
            // User has already liked this blog, remove the like
            await db.like.delete({
                where: {
                    id: existingLike.id,
                },
            });
            
            // Decrement the like count on the blog post
            await db.blog.update({
                where: {
                    id: blogId,
                },
                data: {
                    likeCount: {
                        decrement: 1,
                    },
                },
            });
            
            return new Response(JSON.stringify({ message: "Like removed" }), {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }
        // User has not liked this blog, add a new like
        const newLike = await db.like.create({
            data:{
                blogId,
                userId: session.user.id,
            }
        })
        if(!newLike) {
            return new Response("Failed to add like", { status: 500 });
        }

        // Increment the like count on the blog post
        await db.blog.update({
            where: {
                id: blogId,
            },
            data: {
                likeCount: {
                    increment: 1,
                },
            },
        });
        return new Response(JSON.stringify({ message: "Like added" }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error while adding like:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}