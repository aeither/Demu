import * as React from "react"
import Image from "next/image"
import { QueryFunctionContext, useQuery } from "@tanstack/react-query"
import { Web3Button, useAddress } from "@thirdweb-dev/react"
import { Howl } from "howler"
import {
  Activity,
  Airplay,
  Album,
  Heart,
  Home,
  Library,
  ListMusic,
  Maximize2,
  Mic2,
  Music2,
  PlayCircle,
  PlusCircle,
  Radio,
  Search,
  ShoppingBag,
  ShoppingCart,
  User,
  Volume2,
} from "lucide-react"
import { signIn, useSession } from "next-auth/react"

import useStore from "@/lib/store"
import { cn } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ClientOnly from "./client-only"
import { DialogModal } from "./dialog-modal"
import { ThemeToggle } from "./theme-toggle"
import { Slider } from "./ui/slider"
import { abi } from "@/lib/abi"

const playlists = [
  "Recently Added",
  "Recently Played",
  "Top Songs",
  "Top Albums",
  "Top Artists",
  "Logic Discography",
  "Bedtime Beats",
  "Feeling Happy",
]

interface Album {
  title: string
  author: string
  thumb: string
}

const listenNowAlbums: Album[] = [
  {
    title: "Echoes of Dragonsfire",
    author: "Lyra Elwyn",
    thumb:
      "https://lexica-serve-encoded-images2.sharif.workers.dev/full_jpg/51d25146-34b0-4fb5-8cbf-1c78681c1272",
  },
  {
    title: "Rhapsody of the Forgotten Realm",
    author: "Evangeline Rosewood",
    thumb:
      "https://lexica-serve-encoded-images2.sharif.workers.dev/full_jpg/c9af7ad3-f799-4b58-9f8c-fd23e81ae0d9",
  },
  {
    title: "The Shadow Symphony",
    author: "Raven Blackwood",
    thumb:
      "https://lexica-serve-encoded-images2.sharif.workers.dev/full_jpg/d99afe31-5d55-4c16-aba4-2f8b48927d16",
  },
  {
    title: "Whispers of the Elemental Kingdom",
    author: "Thorne Wilder",
    thumb:
      "https://lexica-serve-encoded-images2.sharif.workers.dev/full_jpg/31d6f736-98a1-4ea8-9689-a2dde4205a20",
  },
]

export function HomeView() {
  const { data: session } = useSession()
  const { email, image } = session?.user || {}
  const [selected, setSelected] = React.useState(0)
  const { currentPlaying, playingHowler, setCurrentPlaying, setPlayingHowler } =
    useStore()

  const { data: musics } = useQuery({
    queryKey: ["musics", (session?.user as any)?.id || ""],
    queryFn: async ({
      queryKey,
    }: QueryFunctionContext<[string, string | undefined]>) => {
      const [_key, id] = queryKey
      if (!id) return
      return await fetch(`/api/musics/?id=${id}`).then((data) => data.json())
    },
  })

  const mintMusic = async () => {
    // currentPlaying
  }

  return (
    <ClientOnly>
      <div className="relative h-screen rounded-md bg-white shadow-2xl transition-all dark:bg-slate-900">
        <div className="grid h-full grid-cols-5 xl:grid-cols-6">
          <aside className="pb-12 ">
            <div className="px-8 py-6">
              <p className="flex items-center text-3xl font-semibold tracking-tight">
                <Activity className="mr-2" />
                Demu
              </p>
            </div>
            <div className="space-y-4">
              <div className="px-6 py-2">
                <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
                  Discover
                </h2>
                <div className="space-y-1 pl-4">
                  <Button
                    variant="subtle"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <Home className="mr-2 h-4 w-4" />
                    Home
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <Radio className="mr-2 h-4 w-4" />
                    Radio
                  </Button>
                </div>
              </div>
              <div className="px-6 py-2">
                <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
                  Library
                </h2>
                <div className="space-y-1 pl-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <ListMusic className="mr-2 h-4 w-4" />
                    Playlists
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <Music2 className="mr-2 h-4 w-4" />
                    Liked Songs
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Made for You
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <Mic2 className="mr-2 h-4 w-4" />
                    Artists
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <Library className="mr-2 h-4 w-4" />
                    Albums
                  </Button>
                </div>
              </div>
              <div className="px-6 py-2">
                <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
                  Store
                </h2>
                <div className="space-y-1 pl-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Store
                  </Button>
                </div>
              </div>
              <div className="py-2">
                <h2 className="relative px-8 text-lg font-semibold tracking-tight">
                  Playlists
                </h2>
                <ScrollArea className="h-[230px] px-4">
                  <div className="space-y-1 py-2 pl-4">
                    {playlists.map((playlist) => (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start font-normal"
                      >
                        <ListMusic className="mr-2 h-4 w-4" />
                        {playlist}
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </aside>
          <div
            className={cn(
              "col-span-3 border-l border-l-slate-200 bg-slate-100 bg-opacity-0 bg-gradient-to-bl from-black via-black to-black transition duration-500 dark:border-l-slate-700 dark:bg-black xl:col-span-5",
              selected === 0 && "bg-opacity-100 bg-gradient-to-bl from-red-600",
              selected === 1 &&
                "bg-opacity-100 bg-gradient-to-bl from-lime-600",
              selected === 2 &&
                "bg-opacity-100 bg-gradient-to-bl from-orange-600",
              selected === 3 && "bg-opacity-100 bg-gradient-to-bl from-sky-600"
            )}
          >
            <div className="h-full px-8 py-6">
              <Tabs defaultValue="music" className="h-full space-y-6">
                <div className="space-between flex items-center">
                  <TabsList>
                    <TabsTrigger value="music" className="relative">
                      Music
                    </TabsTrigger>
                    <TabsTrigger value="podcasts" disabled>
                      Podcasts
                    </TabsTrigger>
                    <TabsTrigger value="live" disabled>
                      Live
                    </TabsTrigger>
                  </TabsList>
                  <div className="ml-auto mr-4 flex gap-4">
                    <ThemeToggle />
                    <DialogModal />
                  </div>
                  <div>
                    {!session && !email ? (
                      <SignInModal />
                    ) : (
                      <Image
                        alt={email}
                        width={40}
                        height={40}
                        src={
                          "https://avatars.dicebear.com/api/micah/" +
                          email +
                          ".svg"
                        }
                      />
                    )}
                  </div>
                </div>
                <TabsContent value="music" className="border-none p-0">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h2 className="text-2xl font-semibold tracking-tight">
                        Good morning
                      </h2>
                    </div>
                  </div>
                  <div className="relative pt-6">
                    <div className="relative flex space-x-4">
                      {listenNowAlbums.map((asset, index) => (
                        <AlbumArtwork
                          key={asset.title}
                          asset={asset}
                          className="w-[250px]"
                          onMouseOver={() => setSelected(index)}
                          onMouseOut={() => setSelected(-1)}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">
                      Latest
                    </h2>
                  </div>
                  <div className="relative pt-6">
                    <ScrollArea>
                      <div className="flex space-x-4 pb-4">
                        {musics &&
                          musics.data.map((asset) => (
                            <AlbumArtwork
                              key={asset.id}
                              asset={asset}
                              className="w-[150px]"
                              aspectRatio={1 / 1}
                            />
                          ))}
                      </div>
                      <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 h-20 w-screen border-t border-t-slate-200 bg-black dark:border-t-slate-700">
          <div className="flex h-full items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <div className="relative h-14 w-14">
                <AspectRatio
                  ratio={1 / 1}
                  className="overflow-hidden rounded-full"
                >
                  <Image
                    src={
                      currentPlaying
                        ? currentPlaying.cover
                        : "https://lexica-serve-encoded-images2.sharif.workers.dev/full_jpg/51d25146-34b0-4fb5-8cbf-1c78681c1272"
                    }
                    fill
                    className={cn(
                      currentPlaying &&
                        currentPlaying.isPlaying &&
                        "animate-spin"
                    )}
                    alt="NJ logo"
                    priority
                  />
                </AspectRatio>
              </div>
              <div>
                <h3 className="font-medium leading-none">
                  {currentPlaying ? currentPlaying.name : "Echoes of Dragonsfire"}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {currentPlaying ? currentPlaying.artist : "Lyra Elwyn"}
                </p>
              </div>
              <Heart className="h-4 w-4" />
              <MintModal />
            </div>
            <div>
              <div className="flex justify-between">
                <p className="text-sm text-slate-700 dark:text-slate-500">
                  0:00
                </p>
                <p className="text-sm text-slate-700 dark:text-slate-500">
                  3:29
                </p>
              </div>
              <PlaybackProgress />
            </div>
            <div>
              <div className="flex gap-2">
                <Mic2 className="h-4 w-4 text-slate-700 dark:text-slate-500" />
                <ListMusic className="h-4 w-4 text-slate-700 dark:text-slate-500" />
                <Airplay className="h-4 w-4 text-slate-700 dark:text-slate-500" />
                <Volume2 className="h-4 w-4 text-slate-700 dark:text-slate-500" />
                <Slider
                  defaultValue={[100]}
                  max={100}
                  step={1}
                  className="w-[80px]"
                />
                <Maximize2 className="h-4 w-4 text-slate-700 dark:text-slate-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClientOnly>
  )
}

function PlaybackProgress() {
  const [progress, setProgress] = React.useState(13)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Slider
      defaultValue={[progress]}
      max={100}
      step={1}
      className="w-[280px]"
    />
  )
}

interface UploadMusicProps extends React.HTMLAttributes<HTMLDivElement> {}

function SignInModal({ className, ...props }: UploadMusicProps) {
  return (
    <div className={cn("space-y-3", className)} {...props}>
      <Dialog>
        <DialogTrigger>
          <Button size="sm" className="relative">
            Sign in
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign In</DialogTitle>
            <DialogDescription>Sign into your account.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Button onClick={() => signIn("google")}>Sign in</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function MintModal({ className, ...props }: UploadMusicProps) {
  const { currentPlaying } = useStore()
  const address = useAddress()
  
  return (
    <div className={cn("space-y-3", className)} {...props}>
      <Dialog>
        <DialogTrigger>
          <ShoppingBag className="h-4 w-4" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mint as NFT</DialogTitle>
            {/* <DialogDescription>Sign into your account.</DialogDescription> */}
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Web3Button
              contractAddress="0xf1a0BeF961286Bb2ad4F350325986318C398330F"
              contractAbi={abi}
              action={async (contract) => {
                if (!currentPlaying) return

                const { artist, cover, url, name } = currentPlaying
                console.log("🚀 ~ file: home-view.tsx:478 ~ action={ ~ currentPlaying", currentPlaying)
                const tx = await contract.call(
                  "safeMint",
                  address,
                  name,
                  artist,
                  cover,
                  url
                )
                const receipt = tx.receipt
              }}
            >
              Mint NFT
            </Web3Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

interface AlbumArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  aspectRatio?: number
  asset: any
}

function AlbumArtwork({
  asset,
  aspectRatio = 3 / 4,
  className,
  ...props
}: AlbumArtworkProps) {
  const { currentPlaying, playingHowler, setCurrentPlaying, setPlayingHowler } =
    useStore()

  return (
    <div className={cn("group space-y-3", className)} {...props}>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="relative">
            <div className="absolute bottom-0 right-0 z-20">
              <div className="text-clip p-1">
                <PlayCircle
                  onClick={() => {
                    // if click again the same track
                    if (
                      currentPlaying &&
                      currentPlaying.isPlaying &&
                      currentPlaying.url === asset.url
                    ) {
                      playingHowler.pause()
                      setCurrentPlaying({
                        ...currentPlaying,
                        isPlaying: false,
                      })
                      return
                    } else if (
                      currentPlaying &&
                      !currentPlaying.isPlaying &&
                      currentPlaying.url === asset.url
                    ) {
                      playingHowler.play()
                      setCurrentPlaying({
                        ...currentPlaying,
                        isPlaying: true,
                      })
                      return
                    }

                    if (playingHowler)
                      // If click another music, stop last track
                      playingHowler.stop()

                    // If first time
                    const sound = new Howl({
                      src: [asset.url],
                    })
                    setPlayingHowler(sound)
                    sound.play()
                    setCurrentPlaying({
                      isPlaying: true,
                      url: asset.url,
                      name: asset.title,
                      artist: asset.author,
                      cover: asset.thumb,
                    })

                    console.log(asset.url)
                  }}
                  className="h-12 w-12 translate-y-4 rounded-full bg-slate-900 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100"
                />
              </div>
            </div>
            <AspectRatio
              ratio={aspectRatio}
              className="overflow-hidden rounded-md"
            >
              <Image
                src={asset?.thumb}
                alt={asset?.title}
                fill
                className="object-cover transition-all group-hover:scale-105"
              />
            </AspectRatio>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-40">
          <ContextMenuItem>Add to Library</ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>Add to Playlist</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuItem>
                <PlusCircle className="mr-2 h-4 w-4" />
                New Playlist
              </ContextMenuItem>
              <ContextMenuSeparator />
              {playlists.map((playlist) => (
                <ContextMenuItem key={playlist}>
                  <ListMusic className="mr-2 h-4 w-4" /> {playlist}
                </ContextMenuItem>
              ))}
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuItem>Play Next</ContextMenuItem>
          <ContextMenuItem>Play Later</ContextMenuItem>
          <ContextMenuItem>Create Station</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Like</ContextMenuItem>
          <ContextMenuItem>Share</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{asset?.title}</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {asset?.author}
        </p>
      </div>
    </div>
  )
}
