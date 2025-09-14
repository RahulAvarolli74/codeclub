import { Activity, DraftingCompass, Mail, Zap } from 'lucide-react'
import Image from 'next/image'

export default function FeaturesSection() {
    return (
        <section id='features' className="py-16 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                <div className="grid items-center gap-12 md:grid-cols-2 md:gap-12 lg:grid-cols-5 lg:gap-24">
                    <div className="lg:col-span-2">
                        <div className="md:pr-6 lg:pr-0">
                            <h2 className="text-4xl font-semibold lg:text-5xl">Level up using these features</h2>
                            <p className="mt-6">Whether you're here to practice, compete, or just keep up with the club — this platform gives you everything you need in one place</p>
                        </div>
                        <ul className="mt-8 divide-y border-y *:flex *:items-center *:gap-3 *:py-3">
                            <li>
                                <Zap className="size-5" />
                                Daily curated CP & DSA questions
                            </li>
                            <li>
                                <Activity className="size-5" />
                                Track your solved problems and performance
                            </li>
                            <li>
                                <Mail className="size-5" />
                                Stay updated with events, contests, and blogs
                            </li>
                            <li>
                                <DraftingCompass className="size-5" />
                                Learn from writeups, solutions, and peer guides
                            </li>
                        </ul>
                    </div>
                    <div className="border-border/50 relative rounded-3xl border p-3 lg:col-span-3">
                        <div className="bg-linear-to-b aspect-76/59 relative rounded-2xl from-zinc-300 to-transparent p-px dark:from-zinc-700">
                            <Image src="/newMock.png" className="hidden rounded-[15px] dark:block" alt="payments illustration dark" width={1207} height={929} />
                            <Image src="/newMock.png" className="rounded-[15px] shadow dark:hidden" alt="payments illustration light" width={1207} height={929} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
