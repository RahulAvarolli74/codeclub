const members = [
    {
        name: 'Harsh Goyal',
        role: 'Mentor',
        avatar: '/team/harsh.jpg',
    },
    {
        name: 'Anirudh H',
        role: 'Mentor',
        avatar: '/team/Anirudh.jpg',
    },
    {
        name: 'Nikhil B',
        role: 'Mentor',
        avatar: '/team/nikhil.jpg',
    },
    {
        name: 'Sanjana',
        role: 'Mentor',
        avatar: '/team/Sanjana.jpg',
    },
    {
        name: 'Rohit M',
        role: 'Mentor',
        avatar: '/team/Rohit.JPG',
    },
    {
        name: 'Tarun B',
        role: 'Mentor',
        avatar: '/team/tarun.png',
    },
    {
        name: 'Ansh S',
        role: 'Mentor',
        avatar: '/team/Ansh.jpg',
    },
     {
        name: 'Vishruth H',
        role: 'President',
        avatar: '/team/vishruth.jpeg',
    },
    {
        name: 'Pratham K',
        role: 'Lead',
        avatar: '/team/kt.jpg',
    },
    {
        name: 'Anagha',
        role: 'Lead',
        avatar: '/team/anaga.jpg',
    },
    {
        name: 'Sairam',
        role: 'Lead',
        avatar: '/team/sairam.jpeg',
    },
    {
        name: 'Shivanand',
        role: 'Lead',
        avatar: '/team/shiva.png',
    },
]

export default function TeamSection() {
    return (
        <section id="team" className="bg-gray-50 md:py-32 dark:bg-transparent">
            <div className="mx-auto max-w-5xl border-t px-6">
                <span className="text-3xl font-bold -ml-6 -mt-3.5 block w-max bg-gray-50 px-6 dark:bg-gray-950">Team</span>
                
                <div className="mt-12 md:mt-24">
                    <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
                        {members.map((member, index) => (
                            <div
                                key={index}
                                className="group overflow-hidden">
                                <img
                                    className="h-80 w-full rounded-md object-cover object-top grayscale-75 transition-all duration-500 hover:grayscale-0 group-hover:h-[21.5rem] group-hover:rounded-xl"
                                    src={member.avatar}
                                    alt="team member"
                                    width="826"
                                    height="1239"
                                />
                                <div className="px-2 pt-2 sm:pb-0 sm:pt-4">
                                    <div className="flex justify-between">
                                        <h3 className="text-base font-medium transition-all duration-500 group-hover:tracking-wider">{member.name}</h3>
                                        <span className="text-xs">_0{index + 1}</span>
                                    </div>
                                    <div className="mt-1 flex items-center justify-between">
                                        <span className="text-muted-foreground inline-block text-sm transition duration-300">{member.role}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}