import Link from "next/link";
import { fontHeading } from "./layout";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import SignOut from "./components/sign-out";

export default async function Home() {
  const session = await auth()
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="text-center">
        <div className={`text-7xl ${fontHeading.className}`}>
          Heil Codeclub
        </div>
        {
          session ? (
            <div>
              <div className="text-2xl">
                Welcome back, {session?.user?.name}!
              </div>
                <SignOut />
            </div>
          ) : (
            <Link href="/login" className="text-2xl">
            <Button>
              Login
            </Button>
            </Link>
          )
        }
        
      </div>
    </div>
  );
}
