import React, { useEffect, useState } from "react"
import Pusher, { Channel } from "pusher-js"
import { Package, Session, Stargazer, Status } from "@/generated/graphql"
import Spinner from "@/components/Spinner"
import {
  ClipboardDocumentCheckIcon,
  ClipboardDocumentIcon,
  ExclamationCircleIcon,
  StarIcon,
} from "@heroicons/react/20/solid"
import AppLayout from "@/layouts/AppLayout"
import useStore from "@/utils/store"
import { GetServerSideProps } from "next"
import client from "@/utils/apollo"
import { captureException } from "@sentry/core"
import ProjectLogo from "@/components/ProjectLogo"
import { NextSeo } from "next-seo"
import { useRouter } from "next/router"
import Image from "next/image"
import SESSION_QUERY from "@/graphql/session"
import splitbee from "@splitbee/web"

interface Props {
  packages: Package[]
  session?: string
  stargazer: Stargazer
  alreadyProcessed?: boolean
}

const EVENT_NAME = "star.processed"

const Session = ({ session, packages: ssrPackages, alreadyProcessed }: Props) => {
  const [channel, setChannel] = useState<Channel>()
  const setStep = useStore((state) => state.setStep)
  const steps = useStore((state) => state.steps)
  const setPackages = useStore((state) => state.setPackages)
  const packages = useStore((state) => state.packages)
  const replacePackage = useStore((state) => state.replacePackage)
  const [isCopied, setIsCopied] = useState<boolean>(false)
  const { asPath } = useRouter()
  const finished = packages.filter((p) => p.pivot?.status !== Status.Pending).length === packages.length
  const [pusher, setPusher] = useState<Pusher>()

  useEffect(() => {
    setPackages(ssrPackages)
  }, [setPackages, ssrPackages])

  useEffect(() => {
    if (!alreadyProcessed && pusher === undefined) {
      setPusher(
        new Pusher(process.env.NEXT_PUBLIC_PUSHER_API_KEY ?? "", {
          cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
        }),
      )
    }
  }, [alreadyProcessed, pusher])

  useEffect(() => {
    if (session) {
      setChannel(pusher?.subscribe(`session.${session}`))

      splitbee.track("connect websockets")

      return () => {
        pusher?.unsubscribe(`session.${session}`)
      }
    }
  }, [pusher, session])

  useEffect(() => {
    channel?.unbind(EVENT_NAME)

    channel?.bind(EVENT_NAME, (data: { package: Package }) => {
      replacePackage(data.package)
    })
  }, [channel, replacePackage])

  useEffect(() => {
    channel?.unbind("session.finished")

    channel?.bind("session.finished", () => {
      pusher?.unsubscribe(`session.${session}`)

      splitbee.track("disconnect websockets")
    })
  }, [channel, pusher, replacePackage, session])

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

    splitbee.track("copied link")
  }

  return (
    <>
      <NextSeo
        canonical={`${process.env.NEXT_PUBLIC_APP_URL}${asPath}`}
        openGraph={{
          images: [
            {
              url: `${process.env.NEXT_PUBLIC_APP_URL}/default.png`,
              width: 1200,
              height: 630,
            },
          ],
          type: "website",
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
      />
      <AppLayout>
        {packages && finished && (
          <div className="mb-8 rounded-md bg-zinc-100 dark:bg-zinc-500/10 backdrop-blur-3xl shadow-xl border border-zinc-200 dark:border-zinc-800 px-6 pt-5 pb-6 w-full flex flex-col gap-6">
            <h1 className="text-emerald-500 text-2xl font-bold">Congratulations!</h1>
            <h2 className="text-zinc-600 dark:text-zinc-400 text-md">
              You have successfully starred <span className="text-yellow-500 font-bold">{packages.length}</span>{" "}
              packages on GitHub. <br />
              <span className="text-sm">
                You may use this link to share your favorite packages and let others star them too.
              </span>
            </h2>

            <div>
              <Image
                src={`${process.env.NEXT_PUBLIC_APP_URL}/api/og?session=${session}`}
                alt="Preview"
                width={1200}
                height={630}
                className="rounded-t-lg"
              />

              <div
                className="w-full inline-flex justify-center items-center bg-zinc-200/50 dark:bg-zinc-700/50 gap-2 text-zinc-600 dark:text-zinc-400 dark:text-zinc-300 rounded-b-lg py-4 px-2 hover:text-emerald-500 cursor-pointer text-sm"
                onClick={handleCopyClick}
              >
                <code>{share}</code>
                {!isCopied && <ClipboardDocumentIcon className="w-4 h-4" />}
                {isCopied && <ClipboardDocumentCheckIcon className="w-4 h-4" />}
              </div>
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
                      <ProjectLogo src={item.image} alt={item.name} />

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
    </>
  )
}

export default Session

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { data } = await client.query<{ session: Session }>({
      query: SESSION_QUERY,
      variables: {
        session: context.params?.session,
      },
    })

    return {
      props: {
        packages: data.session.packages,
        stargazer: data.session.stargazer,
        session: context.query?.session,
        alreadyProcessed: data.session.processed_at !== null,
      },
    }
  } catch (e) {
    captureException(e)

    return {
      notFound: true,
    }
  }
}
