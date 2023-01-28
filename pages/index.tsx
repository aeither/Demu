import Head from "next/head"

import { AppleMusicDemo } from "@/components/apple-music-demo"
import { Layout } from "@/components/layout"

export default function IndexPage() {
  return (
    <Layout>
      <Head>
        <title>Next.js</title>
        <meta
          name="description"
          content="Next.js template for building apps with Radix UI and Tailwind CSS"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="hidden lg:block">
        <AppleMusicDemo />
      </div>
      <div className="container flex h-screen items-center justify-center text-center lg:hidden">
        <h2 className="text-xl font-medium">
          For optimal viewing, we recommend accessing this website on a desktop
          or laptop computer.
        </h2>
      </div>
    </Layout>
  )
}
