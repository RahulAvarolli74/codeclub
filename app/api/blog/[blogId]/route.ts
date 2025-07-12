import { auth } from "@/auth";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// Ensure this API route runs in Node.js runtime
export const runtime = 'nodejs';

export async function GET(
    request: NextRequest, 
    { params }: { params: Promise<{ blogId: string }> }
) {
    try {
        const { blogId } = await params;
        
        // Validate blogId parameter
        if (!blogId || typeof blogId !== 'string') {
            return NextResponse.json(
                { error: "Invalid blog ID" },
                { status: 400 }
            );
        }

        const session = await auth();
        if (!session?.user?.cfHandle) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

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
            return NextResponse.json(
                { error: "Blog post not found" },
                { status: 404 }
            );
        }

        const isLikedByUser = await db.like.findFirst({
            where: {
                blogId: blog.id,
                userId: session.user.id,
            }
        });

        return NextResponse.json({
            ...blog,
            isLiked: !!isLikedByUser,
        }, { status: 200 });

    } catch (error) {
        console.error("Error fetching blog post:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}