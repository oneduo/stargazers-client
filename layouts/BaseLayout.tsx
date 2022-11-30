import React from "react"
import Hero from "@/components/Hero"

interface Props {
  children: React.ReactNode
}

export default function BaseLayout({ children }: Props) {
  return (
    <>
      <div className="bg-white dark:bg-zinc-900 relative">
        <Hero />
        {children}
      </div>
    </>
  )
}
