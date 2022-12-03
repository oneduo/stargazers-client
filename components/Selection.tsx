import React, { useEffect, useState } from "react"
import useStore from "@/utils/store"
import { Package } from "@/generated/graphql"
import { useMutation } from "@apollo/client"
import STAR_MUTATION from "@/graphql/star"
import Button from "@/components/Button"

export default function Selection() {
  const packages = useStore((state) => state.packages)
  const [selection, setSelection] = useState<Package[]>(packages)
  const setLoginUrl = useStore((state) => state.setLoginUrl)
  const nextStep = useStore((state) => state.nextStep)

  const [mutate, { data, loading, error }] = useMutation<{ star: string }>(STAR_MUTATION)

  const select = (p: Package) => {
    setSelection([...selection, p])
  }

  const deselect = (p: Package) => {
    setSelection(selection.filter((s) => s.id !== p.id))
  }

  const isSelected = (p: Package) => {
    return selection.includes(p)
  }

  const toggleSelection = (p: Package) => {
    if (isSelected(p)) {
      deselect(p)
    } else {
      select(p)
    }
  }

  const selectAll = () => {
    setSelection(packages)
  }

  const deselectAll = () => {
    setSelection([])
  }

  const submit = async () => {
    if (selection.length === 0) {
      return
    }

    try {
      await mutate({ variables: { packages: selection.map((s) => s.id) } })
    } catch (e) {}
  }

  useEffect(() => {
    if (data?.star) {
      setLoginUrl(data.star)
      nextStep()
    }
  }, [data, nextStep, setLoginUrl])

  return (
    <div className="rounded-md bg-zinc-800/60 backdrop-blur-md shadow-xl border-2 border border-zinc-800 px-6 pt-5 pb-6 w-full min-h-[40vh] flex flex-col gap-6">
      <fieldset>
        <legend className="text-lg font-medium text-gray-900 dark:text-zinc-100">
          We found
          <span className="font-semibold text-emerald-500"> {packages.length ?? 0} </span>
          packages from your dependencies
        </legend>
        <p className="text-zinc-400 text-sm">You may select the projects you want to star.</p>

        <div className="inline-flex gap-2 text-xs my-4 justify-end w-full">
          <button
            className="text-emerald-500 hover:underline focus:outline-none focus:ring-0 focus:underline"
            type="button"
            onClick={selectAll}
          >
            Select all
          </button>
          <button
            className="text-emerald-500 hover:underline focus:outline-none focus:ring-0 focus:underline"
            type="button"
            onClick={deselectAll}
          >
            Deselect all
          </button>
          <span className="text-emerald-500">({selection.length})</span>
        </div>
        <div className="border border-zinc-700 rounded-lg">
          <div className="max-h-[60vh] overflow-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-600/40 scrollbar-track-zinc-700/50 scrollbar-corner-rounded divide divide-y divide-zinc-700 pr-2 scrollbar-thumb-rounded-lg scrollbar-track-rounded-lg">
            {packages.map((p) => (
              <span
                key={p.id}
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
                    htmlFor={p.id}
                    className="select-none font-medium text-gray-700 dark:text-zinc-200 inline-flex items-center gap-2"
                  >
                    {p.name}
                  </label>
                  <span className="text-zinc-500 text-xs">{p.url}</span>
                </div>
                <div className="ml-3 flex h-5 items-center">
                  <input
                    id={p.id}
                    name={p.name}
                    type="checkbox"
                    checked={isSelected(p)}
                    onChange={() => toggleSelection(p)}
                    className="h-6 w-6 rounded-full bg-zinc-600 border-gray-600 text-emerald-500 accent-yellow-500 focus:ring-0 focus:ring-offset-0 focus:outline-none cursor-pointer focus:outline-2 focus:outline-emerald-500"
                  />
                </div>
              </span>
            ))}
          </div>
        </div>
      </fieldset>

      <Button label="Continue" onClick={submit} disabled={selection.length === 0} loading={loading} />

      {error && (
        <div className="text-red-500 text-center w-full mt-2 bg-red-800/20 border border-red-800 p-2 rounded-lg text-sm">
          We were unable to process your file. Reason: {error.message}
        </div>
      )}
    </div>
  )
}
