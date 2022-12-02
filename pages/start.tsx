import Footer from "@/components/Footer"
import React from "react"
import { HeroIllustration } from "@/components/HeroIllustration"
import { Logo } from "@/components/Logo"
import Steps from "@/components/Steps"
import useStore from "../utils/store"

export default function Start() {
  const step = useStore((state) => state.step)

  return (
    <div className="isolate overflow-hidden min-h-screen">
      <div className="overflow-hidden relative">
        <HeroIllustration />
        <div className="overflow-hidden pt-8 sm:pt-12 lg:relative lg:py-36 max-w-4xl mx-auto">
          <div className="w-full px-4 grid grid-cols-12">
            <div className="col-span-3">
              <div className="w-36 text-black dark:text-white">
                <Logo />
              </div>
              <div className="mt-20">
                <Steps />
              </div>
            </div>
            <div className="col-span-9">
              <step.component />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
