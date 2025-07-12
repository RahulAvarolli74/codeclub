import { auth } from "@/auth";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// Ensure this API route runs in Node.js runtime
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
    const session = await auth();
    if (!session?.user) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }
    
    try {
        const { cfHandle } = await request.json();
        if (!cfHandle) {
            return NextResponse.json(
                { error: "Codeforces handle is required" },
                { status: 400 }
            );
        }
        
        // Check if there was a compilation error in the last 3 submissions
        const response = await fetch(`https://codeforces.com/api/user.status?handle=${cfHandle}&from=1&count=3`);
        const data = await response.json();
        
        if (data.status !== "OK") {
            return NextResponse.json(
                { error: "Error fetching data from Codeforces" },
                { status: 500 }
            );
        }
        
        const submissions = data.result;
        const hasCompilationError = submissions.some((submission: any) => submission.verdict === "COMPILATION_ERROR");
        
        if (hasCompilationError) {
            const user = await db.user.update({
                where: { id: session.user.id },
                data: { cfHandle }
            });
            
            return NextResponse.json({
                message: "User verified",
                shouldRefreshSession: true
            }, { status: 200 });
        }
        
        return NextResponse.json(
            { error: "No compilation error found in recent submissions" },
            { status: 400 }
        );
        
    } catch (error) {
        console.error("Error verifying Codeforces handle:", error);
        return NextResponse.json(
            { error: "Error verifying Codeforces handle" },
            { status: 500 }
        );
    }
}