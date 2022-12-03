import React from "react"
import { readdir } from "fs-extra"
import { join } from "path"
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

interface Props {
  logos: string[]
  statistics?: Statistics
}

export default function Home({ statistics, logos }: Props) {
  return (
    <>
      <Hero logos={logos} />
      <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6 lg:px-8 flex flex-col gap-12">
        {/*<Stats*/}
        {/*  projects={statistics?.projectsCount ?? 0}*/}
        {/*  stars={statistics?.starsCount ?? 0}*/}
        {/*  users={statistics?.usersCount ?? 0}*/}
        {/*/>*/}
        <Faq />
        <Team />
        <Sponsors />
        <Footer />
      </div>
    </>
  )
}

export async function getServerSideProps() {
  // let logos: string[] = []
  // let statistics: Statistics | null = null
  //
  // try {
  //   const directoryPath = join(process.cwd(), "public/assets/logo")
  //
  //   logos = await readdir(directoryPath)
  // } catch (e) {
  //   captureException(e)
  // }
  //
  // try {
  //   const { data } = await client.query<{ statistics: Statistics }>({
  //     query: STATS_QUERY,
  //   })
  //
  //   statistics = data.statistics
  // } catch (e) {
  //   captureException(e)
  // }

  return {
    props: {
      logos: [],
      // statistics: null,
    },
  }
}
