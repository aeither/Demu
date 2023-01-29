import type { AppProps } from "next/app"
import { Inter as FontSans } from "@next/font/google"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react"
import type { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "next-themes"

import "@/styles/globals.css"
import "@/styles/linear.scss"
import "@/styles/raycast.scss"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const queryClient = new QueryClient()

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <>
      <style jsx global>{`
				:root {
					--font-sans: ${fontSans.style.fontFamily};
				}
			}`}</style>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <SessionProvider session={session}>
          <ThirdwebProvider desiredChainId={3141}>
            <QueryClientProvider client={queryClient}>
              <Component {...pageProps} />
            </QueryClientProvider>
          </ThirdwebProvider>
        </SessionProvider>
      </ThemeProvider>
    </>
  )
}

