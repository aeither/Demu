import * as React from "react"
import Image from "next/image"
import { useStorageUpload } from "@thirdweb-dev/react"
import { ThirdwebStorage } from "@thirdweb-dev/storage"
import { useDropzone } from "react-dropzone"

import { Input } from "@/components/ui/input"

interface UploadMusicProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CoverDropzone({ className, ...props }: UploadMusicProps) {
  const [loading, setLoading] = React.useState(false)
  const [cover, setCover] = React.useState("")
  const storage = new ThirdwebStorage()
  const { mutateAsync: upload } = useStorageUpload()

  const onCoverDrop = React.useCallback(
    async (acceptedFiles: File[]) => {
      setLoading(true)

      const uris = await upload({ data: acceptedFiles })
      console.log(uris)

      const url = await storage.resolveScheme(uris[0])
      setCover(url)

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
          <p>Drop cover here to upload them to IPFS</p>
        </div>
      )}
      {cover && <Image alt={cover} width={40} height={40} src={cover} />}
    </>
  )
}
