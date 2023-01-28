import Head from "next/head"

import { HomeView } from "@/components/home-view"
import { Layout } from "@/components/layout"

export default function IndexPage() {
  return (
    <Layout>
      <Head>
        <title>Demu</title>
        <meta
          name="description"
          content="Demu: Decentralized audio streaming service"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="hidden lg:block">
        <HomeView />
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
