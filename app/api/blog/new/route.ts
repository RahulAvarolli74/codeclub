import { auth } from "@/auth";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// Ensure this API route runs in Node.js runtime
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
    const session = await auth();
    if (!session?.user?.cfHandle) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    try {
        const userId = session.user.id;
        const {title, content} = await request.json();
        
        if (!title || !content) {
            return NextResponse.json(
                { error: "Title and content are required" },
                { status: 400 }
            );
        }

        const newBlog = await db.blog.create({
            data: {
                title,
                content,
                authorId: userId,
            }
        })

        return NextResponse.json(newBlog, { status: 201 });

    } catch (error) {
        console.error("Error creating blog post:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}