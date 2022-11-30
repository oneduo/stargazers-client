import "../styles/globals.css"
import type { AppProps } from "next/app"
import { NextSeo } from "next-seo"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="">
      <NextSeo title="Starred" />
      <div className="bg-white dark:bg-zinc-900 relative">
        <Component {...pageProps} />
      </div>
    </div>
  )
}
