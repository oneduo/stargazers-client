import "../styles/globals.css"
import type { AppProps } from "next/app"
import { NextSeo } from "next-seo"
import { ApolloProvider } from "@apollo/client"
import client from "../utils/apollo"
import Head from "next/head"
import { Analytics } from "@vercel/analytics/react"

export default function App({ Component, pageProps }: AppProps) {
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
