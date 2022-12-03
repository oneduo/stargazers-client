import React from "react"
import { Package, Session, Status } from "../../../generated/graphql"
import Spinner from "@/components/Spinner"
import { ExclamationCircleIcon, StarIcon } from "@heroicons/react/20/solid"
import AppLayout from "../../../layouts/AppLayout"
import { GetServerSideProps } from "next"
import client from "../../../utils/apollo"
import SESSION_QUERY from "../../../graphql/session"
import Link from "@/components/Link"
import { NextSeo } from "next-seo"
import { useRouter } from "next/router"

interface Props {
  packages: Package[]
  username?: string
  session?: string | number
}

const Session = ({ packages, username, session }: Props) => {
  const { asPath } = useRouter()

  return (
    <>
      <NextSeo
        title={`Starred by ${username} - Stargazers`}
        canonical={`${process.env.NEXT_PUBLIC_APP_URL}${asPath}`}
        openGraph={{
          images: [
            {
              url: `${process.env.NEXT_PUBLIC_APP_URL}/api/og?session=${session}`,
            },
          ],
          type: "website",
        }}
      />
      <AppLayout withoutSidebar={true}>
        <div className="relative">
          <div className="absolute inset-x-0 bottom-0 h-1/2"></div>
          <div className="mx-auto max-w-7xl">
            <div className="relative sm:overflow-hidden sm:rounded-2xl">
              <div className="absolute inset-0">
                <div className="absolute inset-0"></div>
              </div>
              <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                <h1 className="text-center text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                  <span className="block text-zinc-300">
                    <span className="text-yellow-500">{username}</span> has starred{" "}
                    <span className="text-yellow-500">
                      {packages?.filter((p) => p.pivot?.status !== Status.Pending).length ?? 0}
                    </span>{" "}
                    packages
                  </span>
                </h1>
                <h2 className="text-center font-bold tracking-tight text-4xl block text-emerald-500">
                  Supporting the open source communities
                </h2>
                <p className="mx-auto mt-6 max-w-lg text-center text-base text-zinc-500 sm:max-w-3xl">
                  We owe a lot of our success to the open source community. With this little app, you can show your
                  appreciation by giving a little back.
                </p>
                <div className="inline-flex justify-center mt-10 w-full">
                  <Link href="/">Get started yourself and star them all!</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-md bg-zinc-800/60 backdrop-blur-md shadow-xl border-2 border border-zinc-800 px-6 pt-5 pb-6 w-full min-h-[40vh] flex flex-col gap-6">
          <fieldset>
            <div className="border border-zinc-700 rounded-lg mt-4">
              <div className="relative max-h-[60vh] overflow-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-600/40 scrollbar-track-zinc-700/50 scrollbar-corner-roundedpr-2 scrollbar-thumb-rounded-lg scrollbar-track-rounded-lg">
                <div className="divide divide-y divide-zinc-700">
                  {packages.map((item) => (
                    <span
                      key={item.id}
                      className="cursor-pointer w-full text-left relative flex items-center py-4 px-4 py-4 hover:bg-emerald-500/5 gap-x-2"
                    >
                      <svg fill="currentColor" viewBox="0 0 24 24" className="w-10 h-10 text-white">
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div className="min-w-0 flex flex-col text-sm w-full gap-1">
                        <label
                          htmlFor={item.id}
                          className="select-none font-medium text-gray-700 dark:text-zinc-200 inline-flex items-center gap-2"
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
              </div>
            </div>
          </fieldset>
        </div>
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
        session: data.session.id,
        username: data.session.stargazer?.username,
      },
    }
  } catch (e) {
    return {
      notFound: true,
    }
  }
}
