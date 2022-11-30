import React from "react"
import { readdir } from "fs-extra"
import { join } from "path"
import Faq from "@/components/Faq"
import Footer from "@/components/Footer"
import Team from "@/components/Team"
import Stats from "@/components/Stats"
import Hero from "@/components/Hero"
import Sponsors from "@/components/Sponsors"

interface Props {
  logos: string[]
}

export default function Home({ logos }: Props) {
  return (
    <>
      <Hero logos={logos} />
      <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6 lg:px-8 flex flex-col gap-12">
        <Stats projects={1500} stars={2300} users={2939} />
        <Faq />
        <Team />
        <Sponsors />
        <Footer />
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const directoryPath = join(process.cwd(), "public/assets/logo")
  const logos = await readdir(directoryPath)

  return {
    props: {
      logos,
    },
  }
}
