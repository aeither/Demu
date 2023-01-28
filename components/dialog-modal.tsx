import * as React from "react"
import Image from "next/image"
import { ConnectWallet, useStorageUpload } from "@thirdweb-dev/react"
import { ThirdwebStorage } from "@thirdweb-dev/storage"
import { Plus } from "lucide-react"
import { useDropzone } from "react-dropzone"
import { useForm } from "react-hook-form"

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
  const [loading, setLoading] = React.useState(false)
  const [cover, setCover] = React.useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => console.log(data)
  console.log(errors)

  return (
    <div className={cn("space-y-3", className)} {...props}>
      <Dialog>
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
            <input
              type="text"
              placeholder="Title"
              {...register("title", { required: true, maxLength: 40 })}
            />
            <input
              type="text"
              placeholder="album"
              {...register("album", { required: true, maxLength: 40 })}
            />
            <input
              type="text"
              placeholder="author"
              {...register("author", { required: true, maxLength: 100 })}
            />

            <input type="submit" />
          </form>
          <DialogFooter>{/* <Button>Import Podcast</Button> */}</DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
