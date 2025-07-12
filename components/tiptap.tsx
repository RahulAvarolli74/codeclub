"use client"

import { useState, useEffect, use } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import TextAlign from "@tiptap/extension-text-align"
import Highlight from "@tiptap/extension-highlight"
import Typography from "@tiptap/extension-typography"
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Eye,
  Send,
  Highlighter,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
  Heading3,
  ChevronLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSession } from "next-auth/react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function CreateBlog() {
  const router = useRouter();
  const { data : session } = useSession();
  const [title, setTitle] = useState("")
  const [wordCount, setWordCount] = useState(0)
  const [isPreview, setIsPreview] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Write your blog...",
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight.configure({
        HTMLAttributes: {
          class: "bg-yellow-200 px-1 rounded",
        },
      }),
      Typography,
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "tiptap-editor focus:outline-none min-h-[400px] px-0 py-4 text-lg leading-relaxed",
      },
    },
    onUpdate: ({ editor }) => {
      const text = editor.getText()
      const words = text
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0)
      setWordCount(words.length)
    },
  })

  // Auto-save simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      if (title || editor?.getText()) {
        setLastSaved(new Date())
      }
    }, 2000)
    return () => clearTimeout(timer)
  }, [title, editor?.getHTML()])

  const handlePublish = async () => {

    console.log("Publishing blog:", {
      title,
      content: editor?.getHTML(),
    })

    const response = await axios.post<any>("/api/blog/new",{
      title,
      content: editor?.getHTML(),
    })

    if(response.status === 201){
      toast.success("Blog published successfully!")
      router.push(`/blogs/${response.data.id}`)
    }else{
      toast.error("Failed to publish blog. Please try again.",response.data.message)
    }
  }

  

  if (!editor) {
    return <div>Loading editor...</div>
  }

  if (isPreview) {
    return (
      <div className="min-h-screen">
        <div className="max-w-4xl mx-auto p-6">
          {/* Preview Header */}
          <div className="flex items-center justify-between mb-8">
            <Button variant="ghost" onClick={() => setIsPreview(false)} className="text-neutral-500">
              <ChevronLeft />
              Back to Editor
            </Button>
            <div className="flex gap-2">
              <Button onClick={handlePublish}>
                <Send className="w-4 h-4 mr-2" />
                Publish
              </Button>
            </div>
          </div>

          {/* Preview Content */}
          <article>
            <h1 className="text-4xl font-bold mb-4">{title || "Untitled"}</h1>

            <div className="flex items-center gap-3 mb-8">
              <Avatar className="h-10 w-10">
                <AvatarImage src={session?.user.image as string} alt={session?.user.name as string} />
                <AvatarFallback>{session?.user.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{session?.user.name}</p>
                <p className="text-xs text-neutral-500">Just now</p>
              </div>
            </div>

            <div className="tiptap-content" dangerouslySetInnerHTML={{ __html: editor.getHTML() }} />
          </article>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">Write</h1>
            {lastSaved && <span className="text-xs text-neutral-500">Saved {lastSaved.toLocaleTimeString()}</span>}
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setIsPreview(true)} className="text-neutral-500">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button onClick={handlePublish}>
              <Send className="w-4 h-4 mr-2" />
              Publish
            </Button>
          </div>
        </div>

        {/* Title Input */}
        <div className="mb-6">
          <Input
            placeholder="Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-3xl md:text-4xl font-bold border-0 px-0 py-2 placeholder:text-neutral-400 focus-visible:ring-2 shadow-none p-6 md:p-10"
          />
        </div>

        {/* Formatting Toolbar */}
        <div className="flex items-center gap-1 mb-4 p-2 border rounded-lg flex-wrap">
          {/* Text Formatting */}
          <Button
            variant={editor.isActive("bold") ? "default" : "ghost"}
            size="sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className="h-8 w-8 p-0"
            disabled={!editor.can().chain().focus().toggleBold().run()}
          >
            <Bold className="w-4 h-4" />
          </Button>
          <Button
            variant={editor.isActive("italic") ? "default" : "ghost"}
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className="h-8 w-8 p-0"
            disabled={!editor.can().chain().focus().toggleItalic().run()}
          >
            <Italic className="w-4 h-4" />
          </Button>
          <Button
            variant={editor.isActive("highlight") ? "default" : "ghost"}
            size="sm"
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className="h-8 w-8 p-0"
            disabled={!editor.can().chain().focus().toggleHighlight().run()}
          >
            <Highlighter className="w-4 h-4" />
          </Button>

          <Separator orientation="vertical" className="h-6 wx-2" />

          {/* Headings */}
          <Button
            variant={editor.isActive("heading", { level: 1 }) ? "default" : "ghost"}
            size="sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className="h-8 w-8 p-0"
            disabled={!editor.can().chain().focus().toggleHeading({ level: 1 }).run()}
          >
            <Heading1 className="w-4 h-4" />
          </Button>
          <Button
            variant={editor.isActive("heading", { level: 2 }) ? "default" : "ghost"}
            size="sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className="h-8 w-8 p-0"
            disabled={!editor.can().chain().focus().toggleHeading({ level: 2 }).run()}
          >
            <Heading2 className="w-4 h-4" />
          </Button>
          <Button
            variant={editor.isActive("heading", { level: 3 }) ? "default" : "ghost"}
            size="sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className="h-8 w-8 p-0"
            disabled={!editor.can().chain().focus().toggleHeading({ level: 3 }).run()}
          >
            <Heading3 className="w-4 h-4" />
          </Button>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Lists and Quote */}
          <Button
            variant={editor.isActive("blockquote") ? "default" : "ghost"}
            size="sm"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className="h-8 w-8 p-0"
            disabled={!editor.can().chain().focus().toggleBlockquote().run()}
          >
            <Quote className="w-4 h-4" />
          </Button>
          <Button
            variant={editor.isActive("bulletList") ? "default" : "ghost"}
            size="sm"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className="h-8 w-8 p-0"
            disabled={!editor.can().chain().focus().toggleBulletList().run()}
          >
            <List className="w-4 h-4" />
          </Button>
          <Button
            variant={editor.isActive("orderedList") ? "default" : "ghost"}
            size="sm"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className="h-8 w-8 p-0"
            disabled={!editor.can().chain().focus().toggleOrderedList().run()}
          >
            <ListOrdered className="w-4 h-4" />
          </Button>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Alignment */}
          <Button
            variant={editor.isActive({ textAlign: "left" }) ? "default" : "ghost"}
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className="h-8 w-8 p-0"
            disabled={!editor.can().chain().focus().setTextAlign("left").run()}
          >
            <AlignLeft className="w-4 h-4" />
          </Button>
          <Button
            variant={editor.isActive({ textAlign: "center" }) ? "default" : "ghost"}
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className="h-8 w-8 p-0"
            disabled={!editor.can().chain().focus().setTextAlign("center").run()}
          >
            <AlignCenter className="w-4 h-4" />
          </Button>
          <Button
            variant={editor.isActive({ textAlign: "right" }) ? "default" : "ghost"}
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className="h-8 w-8 p-0"
            disabled={!editor.can().chain().focus().setTextAlign("right").run()}
          >
            <AlignRight className="w-4 h-4" />
          </Button>
        </div>

        {/* TipTap Editor */}
        <div className="mb-6 border rounded-lg p-4 min-h-[400px] focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
          <EditorContent editor={editor} className="tiptap-editor-content" />
        </div>

        {/* Footer Stats */}
        <div className="flex items-center justify-between text-sm text-neutral-500 pt-4 border-t">
          <span>{wordCount} words</span>
          <span>Draft in Anonymous User</span>
        </div>
      </div>
    </div>
  )
}
