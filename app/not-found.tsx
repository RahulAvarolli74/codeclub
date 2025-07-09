import Link from 'next/link'
 
export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-4xl font-bold mb-4">404 - Not Found</h2>
            <p className="text-xl text-gray-600 mb-6">Could not find requested resource</p>
            <Link href="/" className="text-emerald-200 ">
                Return Home
            </Link>
        </div>
    )
}