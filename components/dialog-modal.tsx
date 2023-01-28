import * as React from "react"
import { Plus } from "lucide-react"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"

import useStore from "@/lib/store"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CoverDropzone } from "./cover-dropzone"
import { MusicDropzone } from "./music-dropzone"

interface UploadMusicProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DialogModal({ className, ...props }: UploadMusicProps) {
  const { cover, musicUrl } = useStore()
  const [open, setOpen] = React.useState(false)

  const { data: sessionData } = useSession()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = async (data) => {
    const body = JSON.stringify({
      album: String(data.album),
      author: String(data.author),
      thumb: cover,
      title: String(data.title),
      url: musicUrl,
      userId: String((sessionData.user as any).id),
    })
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    }

    const res = await fetch("/api/server", options)
      .then((response) => response.json())
      .catch((err) => console.error(err))
    console.log("🚀 ~ file: dialog-modal.tsx:40 ~ onSubmit ~ res", res.data)
    setOpen(false)
  }
  console.log(errors)

  return (
    <div className={cn("space-y-3", className)} {...props}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Button size="sm" className="relative">
            <Plus className="mr-2 h-4 w-4" />
            Add Music
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Music</DialogTitle>
            <DialogDescription>
              Fill to upload to decentralized storage
            </DialogDescription>
          </DialogHeader>
          <CoverDropzone />

          <MusicDropzone />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Label htmlFor="">Title</Label>
            <Input
              type="text"
              placeholder="Title"
              {...register("title", { required: true, maxLength: 40 })}
            />
            <Label htmlFor="">Album</Label>
            <Input
              type="text"
              placeholder="album"
              {...register("album", { required: true, maxLength: 40 })}
            />
            <Label htmlFor="">Author</Label>
            <Input
              type="text"
              placeholder="author"
              {...register("author", { required: true, maxLength: 100 })}
            />
            <div className="mt-4">
              <Button className="block  w-full" type="submit">
                Submit
              </Button>
            </div>
          </form>
          <DialogFooter>{/* <Button>Import Podcast</Button> */}</DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
