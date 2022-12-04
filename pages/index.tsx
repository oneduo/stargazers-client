import React from "react"
import Faq from "@/components/Faq"
import Footer from "@/components/Footer"
import Team from "@/components/Team"
import Stats from "@/components/Stats"
import Hero from "@/components/Hero"
import Sponsors from "@/components/Sponsors"
import { Statistics } from "@/generated/graphql"
import { captureException } from "@sentry/core"
import client from "@/utils/apollo"
import STATS_QUERY from "@/graphql/statistics"
import { NextSeo } from "next-seo"
import { useRouter } from "next/router"

interface Props {
  logos: string[]
  statistics?: Statistics
}

export default function Home({ statistics, logos }: Props) {
  const { asPath } = useRouter()

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
      />
      <Hero logos={logos} />
      <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6 lg:px-8 flex flex-col gap-12">
        <Stats
          projects={statistics?.projectsCount ?? 0}
          stars={statistics?.starsCount ?? 0}
          users={statistics?.usersCount ?? 0}
        />
        <Faq />
        <Team />
        <Sponsors />
        <Footer />
      </div>
    </>
  )
}

export async function getServerSideProps() {
  let logos: string[] = [
    "Beyondcode.svg",
    "Jest.svg",
    "Laravel.svg",
    "Next.svg",
    "Nuxt.svg",
    "Pest.svg",
    "PHP.svg",
    "PHPUnit.svg",
    "Preact.svg",
    "React.svg",
    "Slim.svg",
    "Spatie.svg",
    "Statamic.svg",
    "Symfony.svg",
    "Tailwindcss.svg",
    "Tighten.svg",
    "Vite.svg",
    "Vue.svg",
    "Wordpress.svg",
  ]

  let statistics: Statistics = {
    usersCount: 0,
    starsCount: 0,
    projectsCount: 0,
  }

  try {
    const { data } = await client.query<{ statistics: Statistics }>({
      query: STATS_QUERY,
    })

    statistics = data.statistics
  } catch (e) {
    captureException(e)
  }

  return {
    props: {
      logos,
      statistics,
    },
  }
}
