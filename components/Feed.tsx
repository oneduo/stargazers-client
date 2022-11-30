import React from "react"
import { StarIcon } from "@heroicons/react/20/solid"
import dayjs from "dayjs"

export type Entry = {
  id: string
  from?: string
  project: string
  url: string
  starredAt: any
}

const entries: Entry[] = [
  {
    id: "1",
    from: "Charaf Rezrazi",
    project: "react-query",
    url: "http://localhost:8080",
    starredAt: dayjs().startOf("day").s,
  },
  {
    id: "2",
    from: "Mikael Popowicz",
    project: "nova-file-manager",
    url: "http://localhost:8080",
    starredAt: dayjs().startOf("day").toDate(),
  },
  {
    id: "3",
    project: "nova-file-manager",
    url: "http://localhost:8080",
    starredAt: dayjs().startOf("day").toDate(),
  },
  {
    id: "4",
    from: "Mikael Popowicz",
    project: "nova-file-manager",
    url: "http://localhost:8080",
    starredAt: dayjs().startOf("day").toDate(),
  },
  {
    id: "5",
    from: "Mikael Popowicz",
    project: "nova-file-manager",
    url: "http://localhost:8080",
    starredAt: dayjs().startOf("day").toDate(),
  },
  {
    id: "3",
    project: "nova-file-manager",
    url: "http://localhost:8080",
    starredAt: dayjs().startOf("day").toDate(),
  },
  {
    id: "4",
    from: "Mikael Popowicz",
    project: "nova-file-manager",
    url: "http://localhost:8080",
    starredAt: dayjs().startOf("day").toDate(),
  },
  {
    id: "5",
    from: "Mikael Popowicz",
    project: "nova-file-manager",
    url: "http://localhost:8080",
    starredAt: dayjs().startOf("day").toDate(),
  },
  {
    id: "3",
    project: "nova-file-manager",
    url: "http://localhost:8080",
    starredAt: dayjs().startOf("day").toDate(),
  },
]

export default function Feed() {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <span className="relative inline-flex">
          <span className="inline-flex items-center px-2 py-1 font-semibold uppercase text-xs shadow rounded-md text-red-400 border border-red-400">
            Live feed
          </span>
          <span className="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-400"></span>
          </span>
        </span>
      </div>
      <ul
        role="list"
        className="border border-zinc-100 dark:border-zinc-800 rounded-lg p-8 space-y-4 relative"
      >
        {entries.map((event, eventIdx) => (
          <li key={event.id}>
            <div className="relative">
              {eventIdx !== entries.length - 1 ? (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-zinc-50/50 dark:bg-zinc-800/30"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex space-x-3 items-center">
                <span className="h-8 w-8 rounded-full flex items-center justify-center bg-yellow-500/30 dark:bg-yellow-800/10">
                  <StarIcon
                    className="h-5 w-5 text-yellow-500/60"
                    aria-hidden="true"
                  />
                </span>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div className="inline-flex items-center gap-1 truncate flex-wrap">
                    {event.from && (
                      <span className="text-zinc-400 text-xs">
                        {event.from}
                      </span>
                    )}
                    <span className="text-zinc-500 text-xs">
                      {event.from ? "gave a star to" : "a star was given to"}
                    </span>
                    <a
                      className="text-zinc-800 dark:text-zinc-100 text-xs hover:underline"
                      href={event.url}
                    >
                      {event.project}
                    </a>
                  </div>
                  <div className="whitespace-nowrap text-right text-xs text-zinc-500">
                    <time>10 minutes ago</time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white dark:from-zinc-900" />
      </ul>
    </div>
  )
}
