"use client";
import BlogPost from "@/components/blog-page";
import { useParams } from "next/navigation";


export default function Page() {
  const slug = useParams().blogId as string;

  return (
    <div>
      <BlogPost blogId={slug}  />
    </div>
  )
}