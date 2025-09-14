export default function StatsSection() {
    return (
        <section id="stats" className="py-12 md:py-20">
            <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
                <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center">
                    <h2 className="text-4xl font-medium lg:text-5xl">CodeClub in numbers</h2>
                    <p>We’re not just pushing code, we’re building a movement. Here's what the grind looks like so far.    </p>
                </div>

                <div className="grid gap-12 divide-y *:text-center md:grid-cols-3 md:gap-2 md:divide-x md:divide-y-0">
                    <div className="space-y-4">
                        <div className="text-5xl font-bold">1600+</div>
                        <p>Students in Our Community</p>
                    </div>
                    <div className="space-y-4">
                        <div className="text-5xl font-bold">300+</div>
                        <p>Daily Problems Delivered</p>
                    </div>
                    <div className="space-y-4">
                        <div className="text-5xl font-bold">15+</div>
                        <p>Events Conducted</p>
                    </div>
                </div>
            </div>
        </section>
    )
}