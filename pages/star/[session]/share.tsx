import React from "react"
import { Package, Session, Status } from "@/generated/graphql"
import Spinner from "@/components/Spinner"
import { ExclamationCircleIcon, StarIcon } from "@heroicons/react/20/solid"
import AppLayout from "@/layouts/AppLayout"
import { GetServerSideProps } from "next"
import client from "@/utils/apollo"
import SESSION_QUERY from "@/graphql/session"
import Link from "@/components/Link"
import { NextSeo } from "next-seo"
import { useRouter } from "next/router"
import { captureException } from "@sentry/core"
import ProjectLogo from "@/components/ProjectLogo"

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
        twitter={{
          cardType: 'summary_large_image',
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
                  <span className="block text-zinc-600 dark:text-zinc-300">
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
        <div className="rounded-md bg-zinc-100 dark:bg-zinc-800/60 backdrop-blur-md shadow-xl border border-zinc-200 dark:border-zinc-800 px-6 pt-5 pb-6 w-full min-h-[40vh] flex flex-col gap-6">
          <fieldset>
            <div className="border border-zinc-300 dark:border-zinc-700 rounded-lg mt-4">
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
      fetchPolicy: "cache-first",
    })

    return {
      props: {
        packages: data.session.packages,
        session: data.session.id,
        username: data.session.stargazer?.username,
      },
    }
  } catch (e) {
    captureException(e)

    return {
      notFound: true,
    }
  }
}
