import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { NextSeo } from "next-seo"
import { ApolloProvider } from "@apollo/client"
import client from "../utils/apollo"
import Head from "next/head"
import { Analytics } from "@vercel/analytics/react"
import * as Fathom from "fathom-client"
import { useRouter } from "next/router"
import { useEffect } from "react"

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    Fathom.load("QHUIQPQZ", {
      includedDomains: ["stargazers.app", "www.stargazers.app"],
    })

    function onRouteChangeComplete() {
      Fathom.trackPageview()
    }

    router.events.on("routeChangeComplete", onRouteChangeComplete)

    return () => {
      router.events.off("routeChangeComplete", onRouteChangeComplete)
    }
  }, [router.events])

  if (router.asPath === "/maintenance") {
    return <Component {...pageProps} />
  }

  return (
    <>
      <Head>
        <title>Stargazers - Appreciation for the open source communities</title>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </Head>
      <ApolloProvider client={client}>
        <NextSeo
          title="Stargazers - Appreciation for the open source communities"
          description="A small app to give stars and thank the projects and open source communities we rely on every day"
        />
        <div className="bg-white dark:bg-zinc-900 relative">
          <Component {...pageProps} />
        </div>
      </ApolloProvider>
      <Analytics />
    </>
  )
}
