import NextLink from "next/link"
import { ChevronRightIcon, StarIcon } from "@heroicons/react/20/solid"
import HeroIllustration from "@/components//HeroIllustration"
import Logo from "@/components//Logo"
import LogoGrid from "@/components//LogoGrid"
import Link from "@/components/Link"

interface Props {
  logos: string[]
}

export default function Hero({ logos }: Props) {
  return (
    <div className="isolate min-h-screen overflow-hidden">
      <div className="overflow-hidden pt-8 sm:pt-12 relative lg:py-36">
        <HeroIllustration />
        <div className="mx-auto w-full px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:grid lg:grid-cols-2">
          <div>
            <div className="w-36">
              <NextLink className="text-black dark:text-white hover:text-emerald-100" href="/">
                <Logo />
              </NextLink>
            </div>
            <div className="mt-20 flex flex-col gap-6 w-full">
              <div>
                <a href="https://github.com/oneduo/stargazers/discussions/1" className="inline-flex space-x-4">
                  <span className="rounded-lg bg-emerald-50 dark:bg-emerald-800/40 border border-emerald-500 px-2 py-0.5 text-xs uppercase font-semibold text-emerald-500">
                    New
                  </span>
                  <span className="inline-flex items-center space-x-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    <span>Just launched version 1.0</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                </a>
              </div>
              <div className="sm:max-w-xl">
                <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
                  Show appreciation for the open source artisans
                </h1>
                <p className="mt-6 text-md text-zinc-500 dark:text-zinc-400">
                  We owe a lot of our success to the open source community. With this little app, you can show your
                  appreciation by giving a little back.
                </p>
                <p className="mt-6 text-md text-zinc-500 dark:text-zinc-400">
                  This app enables you to give <span className="text-yellow-500">stars</span> to your favorite open
                  source projects on GitHub.
                </p>
                <p className="mt-6 text-md text-zinc-500 dark:text-zinc-400">
                  If you are able, please consider
                  <span className="text-pink-500"> sponsoring </span>these creators and their projects.
                </p>
              </div>
              <Link href="/star">Get started</Link>
              <div className="mt-6">
                <div className="inline-flex items-center gap-2">
                  <div className="flex flex-shrink-0">
                    <StarIcon className="h-4 w-4 text-yellow-500" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1 py-1 text-sm text-zinc-500 dark:text-zinc-400 sm:py-3 space-x-1">
                    <span>Over</span>
                    <span className="text-yellow-500 font-medium">900+ stars</span>
                    <span>given to open source projects already!</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sm:mx-auto sm:max-w-3xl sm:px-6">
          <div className="py-12 sm:relative sm:mt-12 sm:py-16 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <div className="relative mr-0 sm:-mr-40 pl-4 sm:mx-auto sm:max-w-3xl sm:px-0 lg:h-full lg:max-w-none lg:pl-12">
              <div className="w-full h-full rounded-lg px-4 sm:px-10">
                <LogoGrid logos={logos} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
