import * as React from "react"
import Image from "next/image"
import { useStorageUpload } from "@thirdweb-dev/react"
import { ThirdwebStorage } from "@thirdweb-dev/storage"
import { useDropzone } from "react-dropzone"

import useStore from "@/lib/store"
import { Input } from "@/components/ui/input"

interface UploadMusicProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CoverDropzone({ className, ...props }: UploadMusicProps) {
  const { cover, setCover } = useStore()
  const storage = new ThirdwebStorage()
  const { mutateAsync: upload, isLoading } = useStorageUpload()

  const onDrop = React.useCallback(
    async (acceptedFiles: File[]) => {
      const uris = await upload({ data: acceptedFiles })
      console.log(uris)

      const url = storage.resolveScheme(uris[0])
      setCover(url)
    },
    [upload]
  )
  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <>
      {isLoading ? (
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
