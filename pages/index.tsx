import React from "react"
import Faq from "@/components/Faq"
import Footer from "@/components/Footer"
import Team from "@/components/Team"
import Stats from "@/components/Stats"
import Hero from "@/components/Hero"

export default function Home() {
  return (
    <>
      <Hero />
      <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6 lg:px-8 flex flex-col gap-12">
        <Stats />
        <Faq />
        <Team />
        <Footer />
      </div>
    </>
  )
}
