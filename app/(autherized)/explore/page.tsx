import ExploreCards from "@/components/explore-cards"
import { Separator } from "@/components/ui/separator"
import TopBlogs from "@/components/top-blogs"

const page = () => {
  return (
    <div className="container">
      <ExploreCards />
      <Separator />
      <TopBlogs showAll={false} maxPosts={3} />
    </div>
  )
}

export default page