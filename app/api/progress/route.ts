import { auth } from "@/auth";
import { questions } from "@/data/questions";
import axios from "axios";
import { NextResponse } from "next/server";

// Ensure this API route runs in Node.js runtime
export const runtime = 'nodejs';

export async function GET() {
    const session = await auth();
    if (!session?.user?.cfHandle) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }
    
    try {
        const cfHandle = session.user.cfHandle;
        const response = await axios.get<any>(`https://codeforces.com/api/user.status?handle=${cfHandle}`);
        
        if(response.data?.status !== "OK") {
            return NextResponse.json(
                { error: "Error fetching data from Codeforces" },
                { status: 500 }
            );
        }

        const solvedSet = new Set(
            response.data.result
                .filter((item:any) => item.verdict === "OK")
                .map((item:any) => `${item.problem.contestId}-${item.problem.index}`)
        );

        const personalized = questions.map(q => {
            // Extract contestId and index from the href
            // Example: https://codeforces.com/problemset/problem/1972/B
            const urlParts = q.href.split('/');
            const contestId = urlParts[urlParts.length - 2];
            const index = urlParts[urlParts.length - 1];
            const key = `${contestId}-${index}`;
            
            return {
                ...q,
                completed: solvedSet.has(key)
            };
        });

        return NextResponse.json(personalized, { status: 200 });

    } catch (error) {
        console.error("Error fetching progress:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}