import { auth } from "@/auth";
import db from "@/lib/db";


export async function POST(request: Request) {
    const session = await auth();
    if (!session?.user) {
        return new Response("Unauthorized", { status: 401 });
    }
    const { cfHandle } = await request.json();
    if (!cfHandle) {
        return new Response("Codeforces handle is required", { status: 400 });
    }
    //now i want to check if there was a compilation error in the last 3 submissions
    try {
        const response = await fetch(`https://codeforces.com/api/user.status?handle=${cfHandle}&from=1&count=3`);
        const data = await response.json();
        if (data.status !== "OK") {
            return new Response("Error fetching data from Codeforces", { status: 500 });
        }
        const submissions = data.result;
        //@ts-ignore
        const hasCompilationError = submissions.some(submission => submission.verdict === "COMPILATION_ERROR");
        if (hasCompilationError) {
            const user = await db.user.update({
                where: { id: session.user.id },
                data: { cfHandle }
            })
            return new Response(JSON.stringify({message: "User verified", shouldRefreshSession: true}), { status: 200 });
        }
    } catch (error) {
        console.error("Error verifying Codeforces handle:", error);
        return new Response("Error verifying Codeforces handle", { status: 500 });
    }
}