import { auth } from "@/auth";
import db from "@/lib/db";


export async function POST(request: Request) {
    const session = await auth();
    if (!session?.user?.cfHandle) {
        return new Response("Unauthorized", { status: 401 });
    }

    try {
        const userId = session.user.id;
        const {title, content} = await request.json();
        if (!title || !content) {
            return new Response("Title and content are required", { status: 400 });
        }

        const newBlog = await db.blog.create({
            data: {
                title,
                content,
                authorId: userId,
            }
        })

        return new Response(JSON.stringify(newBlog), {
            status: 201,
            headers: {
                "Content-Type": "application/json",
            },
        });

    } catch (error) {
        console.error("Error creating blog post:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}