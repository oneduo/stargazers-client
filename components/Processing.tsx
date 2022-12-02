import React, { useEffect } from "react"
import Spinner from "@/components/Spinner"
import { ExclamationCircleIcon, StarIcon } from "@heroicons/react/20/solid"
import useStore from "../utils/store"

export default function Processing() {
  const packages = useStore((state) => state.packages)
  const nextStep = useStore((state) => state.nextStep)

  useEffect(() => {
    setTimeout(() => {
      nextStep()
    }, 3000)
  }, [nextStep])

  return (
    <div className="rounded-md bg-zinc-800/60 backdrop-blur-md shadow-xl border-2 border border-zinc-800 px-6 pt-5 pb-6 w-full min-h-[40vh] flex flex-col gap-6">
      <fieldset>
        <legend className="text-lg font-medium text-gray-900 dark:text-zinc-100">
          Processing
          <span className="font-semibold text-emerald-500"> {12}</span>/55
          packages
        </legend>
        <p className="text-zinc-400 text-sm">
          We are processing your packages and communicating with the Github API,
          please wait.
        </p>
        <div className="mt-8">
          {packages.map((item) => (
            <div
              key={item.id}
              className="cursor-pointer w-full text-left relative flex items-center py-4 first:border-t border-b border-l border-r border-zinc-700 first:rounded-t-lg last:rounded-b-lg px-4 py-4 hover:bg-emerald-500/5 gap-x-2"
            >
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-10 h-10 text-white"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="min-w-0 flex flex-col text-sm w-full gap-1">
                <label
                  htmlFor={item.name}
                  className="select-none font-medium text-gray-700 dark:text-zinc-200 inline-flex items-center gap-2"
                >
                  {item.name}
                </label>
                <span className="text-zinc-500 text-xs">{item.url}</span>
              </div>
              <div className="ml-3 flex h-5 items-center">
                {item.pivot === undefined && (
                  <Spinner className="h-5 w-5 text-zinc-500" />
                )}
                {typeof item.pivot?.starred_at === "string" && (
                  <StarIcon className="h-5 w-5 text-yellow-500" />
                )}
                {item.pivot?.starred_at === null && (
                  <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                )}
              </div>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  )
}
