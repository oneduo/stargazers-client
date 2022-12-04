import React, { useEffect, useState } from "react"
import { Channel } from "pusher-js"
import { Package, Status } from "@/generated/graphql"
import Spinner from "@/components/Spinner"
import {
  ClipboardDocumentCheckIcon,
  ClipboardDocumentIcon,
  ExclamationCircleIcon,
  StarIcon,
} from "@heroicons/react/20/solid"
import pusher from "@/utils/pusher"
import AppLayout from "@/layouts/AppLayout"
import useStore from "@/utils/store"
import PACKAGES_QUERY from "@/graphql/packages"
import { GetServerSideProps } from "next"
import client from "@/utils/apollo"
import { captureException } from "@sentry/core"
import Image from "next/image"

interface Props {
  packages: Package[]
  session?: string
}

const EVENT_NAME = "star.processed"

const Session = ({ session, packages: ssrPackages }: Props) => {
  const [channel, setChannel] = useState<Channel>()
  const setStep = useStore((state) => state.setStep)
  const steps = useStore((state) => state.steps)
  const setPackages = useStore((state) => state.setPackages)
  const packages = useStore((state) => state.packages)
  const replacePackage = useStore((state) => state.replacePackage)
  const [isCopied, setIsCopied] = useState<boolean>(false)

  const finished = packages.filter((p) => p.pivot?.status !== Status.Pending).length === packages.length

  useEffect(() => {
    setPackages(ssrPackages)
  }, [setPackages, ssrPackages])

  useEffect(() => {
    if (session) {
      setChannel(pusher.subscribe(`session.${session}`))
    }

    return () => {
      pusher.unsubscribe(`session.${session}`)
    }
  }, [session])

  useEffect(() => {
    channel?.unbind(EVENT_NAME)

    channel?.bind(EVENT_NAME, (data: { package: Package }) => {
      replacePackage(data.package)
    })
  }, [channel, replacePackage])

  useEffect(() => {
    setStep(steps.find((step) => step.key === "processing") ?? steps[0])
  }, [setStep, steps])

  useEffect(() => {
    if (finished) {
      setStep(steps[steps.length - 1])
    }
  }, [finished, setStep, steps])

  async function copyTextToClipboard(text: string) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text)
    } else {
      return document.execCommand("copy", true, text)
    }
  }

  const share = `${process.env.NEXT_PUBLIC_APP_URL}/star/${session}/share`

  const handleCopyClick = () => {
    copyTextToClipboard(share).then(() => {
      setIsCopied(true)
      setTimeout(() => {
        setIsCopied(false)
      }, 1500)
    })
  }

  return (
    <AppLayout>
      {packages && finished && (
        <div className="mb-8 rounded-md bg-zinc-100 dark:bg-zinc-800/60 backdrop-blur-md shadow-xl border border-zinc-200 dark:border-zinc-800 px-6 pt-5 pb-6 w-full flex flex-col gap-6">
          <h1 className="text-emerald-500 text-2xl font-bold">Congratulations!</h1>
          <h2 className="text-zinc-400 text-md">
            You have successfully starred <span className="text-yellow-500 font-bold">{packages.length}</span> packages
            on GitHub. <br />
            <span className="text-sm">
              You may use this link to share your favorite packages and let others star them too.
            </span>
          </h2>
          <div
            className="w-full inline-flex justify-center items-center bg-zinc-600/10 gap-2 text-zinc-600 dark:text-zinc-300 rounded-lg py-4 px-2 hover:text-emerald-500 cursor-pointer"
            onClick={handleCopyClick}
          >
            <code>{share}</code>
            {!isCopied && <ClipboardDocumentIcon className="w-4 h-4" />}
            {isCopied && <ClipboardDocumentCheckIcon className="w-4 h-4" />}
          </div>
        </div>
      )}
      <div className="rounded-md bg-zinc-100 dark:bg-zinc-800/60 backdrop-blur-md shadow-xl border border-zinc-200 dark:border-zinc-800 px-6 pt-5 pb-6 w-full min-h-[40vh] flex flex-col gap-6">
        <fieldset>
          <legend className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
            Processing
            <span className="font-semibold text-emerald-500">
              {" "}
              {packages?.filter((p) => p.pivot?.status !== Status.Pending).length ?? 0}
            </span>
            /{packages.length} packages
          </legend>
          <p className="text-zinc-400 text-sm">
            We are processing your packages and communicating with the Github API, please wait.
          </p>
          <div className="border border-zinc-300 dark:border-zinc-700 rounded-lg mt-8">
            <div className="relative max-h-[60vh] overflow-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-600/40 scrollbar-track-zinc-200 dark:scrollbar-track-zinc-700/50 scrollbar-corner-roundedpr-2 scrollbar-thumb-rounded-lg scrollbar-track-rounded-lg">
              <div className="divide divide-y divide-zinc-300 dark:divide-zinc-700">
                {packages.map((item) => (
                  <span
                    key={item.id}
                    className="cursor-pointer w-full text-left relative flex items-center py-4 px-4 py-4 hover:bg-emerald-500/5 gap-x-2"
                  >
                    {item.image ? (
                      <Image
                        width={460}
                        height={460}
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 rounded-lg"
                      />
                    ) : (
                      <svg fill="currentColor" viewBox="0 0 24 24" className="w-10 h-10 text-black dark:text-white">
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    <div className="min-w-0 flex flex-col text-sm w-full gap-1">
                      <label
                        htmlFor={item.id}
                        className="select-none font-medium text-zinc-700 dark:text-zinc-200 inline-flex items-center gap-2"
                      >
                        {item.name}
                      </label>
                      <span className="text-zinc-500 text-xs">{item.url}</span>
                    </div>
                    <div className="ml-3 flex h-5 items-center">
                      {item.pivot?.status === Status.Done && <StarIcon className="h-5 w-5 text-yellow-500" />}
                      {item.pivot?.status === Status.Pending && <Spinner className="h-5 w-5 text-zinc-500" />}
                      {item.pivot?.status === Status.Error && (
                        <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                  </span>
                ))}
              </div>
              <div className="pointer-events-none sticky bottom-0 h-20 md:h-40 bg-gradient-to-t from-zinc-200 dark:from-zinc-900 rounded-b-lg" />
            </div>
          </div>
        </fieldset>
      </div>
      {packages.filter((p) => p.pivot?.status === Status.Error).length > 0 && (
        <div className="text-yellow-500 text-center w-full mt-6 bg-yellow-500/20 border border-yellow-500 p-2 rounded-lg text-sm">
          We were unable to process some of the requests, please try again later.
        </div>
      )}
    </AppLayout>
  )
}

export default Session

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { data } = await client.query<{ packages: Package[] }>({
      query: PACKAGES_QUERY,
      variables: {
        session: context.params?.session,
      },
    })

    return {
      props: {
        packages: data.packages,
        session: context.query?.session,
      },
    }
  } catch (e) {
    console.log(e)
    captureException(e)

    return {
      notFound: true,
    }
  }
}
