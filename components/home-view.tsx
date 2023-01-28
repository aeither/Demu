import * as React from "react"
import Image from "next/image"
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
  Plus,
  PlusCircle,
  Radio,
  Search,
  ShoppingCart,
  User,
  Volume2,
} from "lucide-react"
import { signIn, useSession } from "next-auth/react"

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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ClientOnly from "./client-only"
import { ThemeToggle } from "./theme-toggle"
import { Progress } from "./ui/progress"
import { DialogModal } from "./dialog-modal"

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
  name: string
  artist: string
  cover: string
}

const listenNowAlbums: Album[] = [
  {
    name: "Async Awakenings",
    artist: "Nina Netcode",
    cover:
      "https://images.unsplash.com/photo-1547355253-ff0740f6e8c1?w=300&dpr=2&q=80",
  },
  {
    name: "The Art of Reusability",
    artist: "Lena Logic",
    cover:
      "https://images.unsplash.com/photo-1576075796033-848c2a5f3696?w=300&dpr=2&q=80",
  },
  {
    name: "Stateful Symphony",
    artist: "Beth Binary",
    cover:
      "https://images.unsplash.com/photo-1606542758304-820b04394ac2?w=300&dpr=2&q=80",
  },
  {
    name: "React Rendezvous",
    artist: "Ethan Byte",
    cover:
      "https://images.unsplash.com/photo-1598295893369-1918ffaf89a2?w=300&dpr=2&q=80",
  },
]

const madeForYouAlbums: Album[] = [
  {
    name: "Async Awakenings",
    artist: "Nina Netcode",
    cover:
      "https://images.unsplash.com/photo-1580428180098-24b353d7e9d9?w=300&dpr=2&q=80",
  },
  {
    name: "Stateful Symphony",
    artist: "Beth Binary",
    cover:
      "https://images.unsplash.com/photo-1606542758304-820b04394ac2?w=300&dpr=2&q=80",
  },
  {
    name: "Stateful Symphony",
    artist: "Beth Binary",
    cover:
      "https://images.unsplash.com/photo-1598062548091-a6fb6a052562?w=300&dpr=2&q=80",
  },
  {
    name: "The Art of Reusability",
    artist: "Lena Logic",
    cover:
      "https://images.unsplash.com/photo-1626759486966-c067e3f79982?w=300&dpr=2&q=80",
  },
  {
    name: "Thinking Components",
    artist: "Lena Logic",
    cover:
      "https://images.unsplash.com/photo-1576075796033-848c2a5f3696?w=300&dpr=2&q=80",
  },
  {
    name: "Functional Fury",
    artist: "Beth Binary",
    cover:
      "https://images.unsplash.com/photo-1606542758304-820b04394ac2?w=300&dpr=2&q=80",
  },
  {
    name: "React Rendezvous",
    artist: "Ethan Byte",
    cover:
      "https://images.unsplash.com/photo-1598295893369-1918ffaf89a2?w=300&dpr=2&q=80",
  },
]

export function HomeView() {
  const { data: session } = useSession()
  const { email, image } = session?.user || {}

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
          <div className="col-span-3 border-l border-l-slate-200 bg-slate-100 dark:border-l-slate-700 dark:bg-black xl:col-span-5">
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
                      {listenNowAlbums.map((album) => (
                        <AlbumArtwork
                          key={album.name}
                          album={album}
                          className="w-[250px]"
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
                        {madeForYouAlbums.map((album) => (
                          <AlbumArtwork
                            key={album.name}
                            album={album}
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
        <div className="absolute bottom-0 h-20 w-screen bg-black border-t border-t-slate-200 dark:border-t-slate-700">
          <div className="flex justify-between items-center h-full p-4">
            <div className="flex items-center gap-4">
              <div>
                <h3 className="font-medium leading-none">Stateful Symphony</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Nina Netcode
                </p>
              </div>
              <Heart className="h-4 w-4" />
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

  return <Progress value={progress} className="w-[280px]" />
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

interface AlbumArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  album: Album
  aspectRatio?: number
}

function AlbumArtwork({
  album,
  aspectRatio = 3 / 4,
  className,
  ...props
}: AlbumArtworkProps) {
  return (
    <div className={cn("group space-y-3", className)} {...props}>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="relative">
            <div className="absolute bottom-0 right-0 z-20">
              <div className="text-clip p-1">
                <PlayCircle className="h-12 w-12 translate-y-4 rounded-full bg-slate-900 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100" />
              </div>
            </div>
            <AspectRatio
              ratio={aspectRatio}
              className="overflow-hidden rounded-md"
            >
              <Image
                src={album.cover}
                alt={album.name}
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
        <h3 className="font-medium leading-none">{album.name}</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {album.artist}
        </p>
      </div>
    </div>
  )
}
