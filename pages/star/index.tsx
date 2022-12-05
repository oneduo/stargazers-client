import React, { useEffect } from "react"
import useStore from "../../utils/store"
import AppLayout from "../../layouts/AppLayout"
import { NextSeo } from "next-seo"
import { useRouter } from "next/router"

export default function Index() {
  const step = useStore((state) => state.step)
  const reset = useStore((state) => state.reset)
  const { asPath } = useRouter()

  useEffect(() => {
    reset()
  }, [reset])

  return (
    <>
      <NextSeo
        canonical={`${process.env.NEXT_PUBLIC_APP_URL}${asPath}`}
        openGraph={{
          images: [
            {
              url: `${process.env.NEXT_PUBLIC_APP_URL}/default.png`,
            },
          ],
          type: "website",
        }}
        twitter={{
            cardType: 'summary_large_image',
        }}
      />
      <AppLayout>{step.component && <step.component />}</AppLayout>
    </>
  )
}
