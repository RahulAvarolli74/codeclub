import { auth } from "@/auth";
import db from "@/lib/db";


export async function GET () {
    const session = await auth();
    if (!session?.user?.cfHandle) {
        return new Response("Unauthorized", { status: 401 });
    }

    try {
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
                    }
                }
            }
        })

        return new Response(JSON.stringify(blogs), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });

    } catch (error) {
        console.error("Error fetching blog posts:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}