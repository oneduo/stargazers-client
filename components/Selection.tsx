import React, { useEffect, useState } from "react"
import useStore from "@/utils/store"
import { Package } from "@/generated/graphql"
import { useMutation } from "@apollo/client"
import STAR_MUTATION from "@/graphql/star"
import Button from "@/components/Button"
import { captureException } from "@sentry/core"
import ProjectLogo from "@/components/ProjectLogo"

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
    } catch (e) {
      captureException(e)
    }
  }

  useEffect(() => {
    if (data?.star) {
      setLoginUrl(data.star)
      nextStep()
    }
  }, [data, nextStep, setLoginUrl])

  return (
    <div className="rounded-md bg-zinc-100 dark:bg-zinc-800/60 backdrop-blur-md shadow-xl border border-zinc-200 dark:border-zinc-800 px-6 pt-5 pb-6 w-full min-h-[40vh] flex flex-col gap-6">
      <fieldset>
        <legend className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
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
        <div className="border border-zinc-300 dark:border-zinc-700 rounded-lg">
          <div className="max-h-[60vh] overflow-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-600/40 scrollbar-track-zinc-200 dark:scrollbar-track-zinc-700/50 scrollbar-corner-rounded divide divide-y divide-zinc-300 dark:divide-zinc-700 pr-2 scrollbar-thumb-rounded-lg scrollbar-track-rounded-lg">
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
                  <input
                    id={item.id}
                    name={item.name}
                    type="checkbox"
                    checked={isSelected(item)}
                    onChange={() => toggleSelection(item)}
                    className="h-6 w-6 rounded-full bg-zinc-200 dark:bg-zinc-600 border-zinc-300 dark:border-zinc-600 text-emerald-500 accent-yellow-500 focus:ring-0 focus:ring-offset-0 focus:outline-none cursor-pointer focus:outline-2 focus:outline-emerald-500"
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
