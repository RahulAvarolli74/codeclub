import { auth } from "@/auth";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// Ensure this API route runs in Node.js runtime
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
    const session = await auth();
    if(!session?.user) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }
    
    try {
        const {blogId} = await request.json();
        if (!blogId) {
            return NextResponse.json(
                { error: "Blog ID is required" },
                { status: 400 }
            );
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
            
            return NextResponse.json(
                { message: "Like removed", isLiked: false },
                { status: 200 }
            );
        }
        
        // User has not liked this blog, add a new like
        const newLike = await db.like.create({
            data:{
                blogId,
                userId: session.user.id,
            }
        });

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
        
        return NextResponse.json(
            { message: "Like added", isLiked: true },
            { status: 200 }
        );
        
    } catch (error) {
        console.error("Error while adding like:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}