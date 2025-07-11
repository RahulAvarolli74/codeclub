import { auth } from "@/auth";
import { questions } from "@/data/questions";

export default async function GET() {
    const session = await auth();
    if (!session) {
        return new Response("Unauthorized", { status: 401 });
    }
    try {
        const cfHandle = session.user.cfHandle;
        const response = await axios.get<any>(`https://codeforces.com/api/user.status?handle=${cfHandle}`);
        
        if(response.data?.status !== "OK") {
            return new Response("Error fetching data", { status: 500 });
        }

        const solvedSet = new Set(
            response.data.result
                .filter((item: any) => item.verdict === "OK")
                .map((item: any) => `${item.problem.contestId}-${item.problem.index}`)
        )

        const peronalized = questions.map(q=>{
            const [contestId,index] = q.href.split('/').slice(-2);
            const key = `${contestId}-${index}`;
            return {
                ...q,
                completed:solvedSet.has(key)
            }
        })

        return new Response(JSON.stringify(peronalized), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        });

    } catch (error) {
        console.log("Error fetching progress:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}