import * as React from "react"
import Image from "next/image"
import { useStorageUpload } from "@thirdweb-dev/react"
import { ThirdwebStorage } from "@thirdweb-dev/storage"
import { Howl, Howler } from "howler"
import { useDropzone } from "react-dropzone"

import { Input } from "@/components/ui/input"
import { Button } from "./ui/button"

interface UploadMusicProps extends React.HTMLAttributes<HTMLDivElement> {}

export function MusicDropzone({ className, ...props }: UploadMusicProps) {
  const [loading, setLoading] = React.useState(false)
  const [music, setMusic] = React.useState<Howl>()
  const storage = new ThirdwebStorage()
  const { mutateAsync: upload } = useStorageUpload()

  const onCoverDrop = React.useCallback(
    async (acceptedFiles: File[]) => {
      setLoading(true)

      const uris = await upload({ data: acceptedFiles })
      console.log(uris)

      const url = await storage.resolveScheme(uris[0])
      const sound = new Howl({
        src: [url],
      })
      setMusic(sound)

      setLoading(false)
    },
    [upload]
  )
  const { getRootProps, getInputProps } = useDropzone({ onDrop: onCoverDrop })

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="rounded border border-dashed p-4" {...getRootProps()}>
          <Input {...getInputProps()} />
          <p>Drop music here to upload them to IPFS</p>
        </div>
      )}
      {music && (
        <>
          <Button onClick={() => music.play()}>Play</Button>
          <Button onClick={() => music.pause()}>Stop</Button>
        </>
      )}
    </>
  )
}
