import Footer from "@/components/Footer"
import React from "react"
import { HeroIllustration } from "@/components/HeroIllustration"
import { Logo } from "@/components/Logo"
import Steps from "@/components/Steps"
import { CloudArrowUpIcon } from "@heroicons/react/24/outline"

export default function Home() {
  return (
    <div className="bg-white dark:bg-zinc-900 min-h-screen">
      <div className="isolate">
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
              <div
                className="flex justify-center items-center rounded-md bg-zinc-800/60 backdrop-blur-md shadow-xl border-2 border border-zinc-800 px-6 pt-5 pb-6 w-full min-h-[40vh]">
                <div className="space-y-2 text-center">
                  <CloudArrowUpIcon className="mx-auto h-12 w-12 text-zinc-400" />
                  <div className="flex text-sm text-zinc-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md font-medium text-emerald-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-emerald-500 focus-within:ring-offset-2 hover:text-emerald-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-zinc-700">json file up to 10MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
