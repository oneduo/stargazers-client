import React, { ReactNode } from "react"
import Link from "next/link"
import HeroIllustration from "@/components/HeroIllustration"
import Logo from "@/components/Logo"
import Steps from "@/components/Steps"
import Footer from "@/components/Footer"

interface Props {
  withoutSidebar?: boolean
  children: ReactNode
}

export default function AppLayout({ withoutSidebar, children }: Props) {
  return (
    <div className="isolate overflow-hidden min-h-screen">
      <div className="overflow-hidden relative">
        <HeroIllustration />
        <div className="overflow-hidden pt-8 sm:py-12 lg:py-24 max-w-4xl mx-auto">
          <div className="w-full px-4 grid grid-cols-12">
            {!withoutSidebar && (
              <div className="col-span-3">
                <div className="w-36 text-black dark:text-white">
                  <Link href="/">
                    <Logo />
                  </Link>
                </div>
                <div className="mt-20">
                  <Steps />
                </div>
              </div>
            )}
            {withoutSidebar && (
              <div className="col-span-12 w-36 text-black dark:text-white mb-8">
                <Link href="/">
                  <Logo />
                </Link>
              </div>
            )}
            <div className={`${withoutSidebar ? "col-span-12" : "col-span-9"}`}>{children}</div>
          </div>
        </div>
        {withoutSidebar && (
          <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6 lg:px-8 flex flex-col gap-12">
            <Footer />
          </div>
        )}
      </div>
    </div>
  )
}
