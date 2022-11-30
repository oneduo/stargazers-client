import React, { useId } from "react"
import { StepComponentProps } from "../types"

export default function Selection({ next }: StepComponentProps) {
  const packages = [
    "oneduo/nova-file-manager",
    "oneduo/nova-file-manager",
    "oneduo/nova-file-manager",
    "oneduo/nova-file-manager",
    "oneduo/nova-file-manager",
    "oneduo/nova-file-manager",
    "oneduo/nova-file-manager",
    "oneduo/nova-file-manager",
    "oneduo/nova-file-manager",
    "oneduo/nova-file-manager",
    "oneduo/nova-file-manager",
    "oneduo/nova-file-manager",
    "oneduo/nova-file-manager",
    "oneduo/nova-file-manager",
  ]

  const id = useId()
  return (
    <div className="rounded-md bg-zinc-800/60 backdrop-blur-md shadow-xl border-2 border border-zinc-800 px-6 pt-5 pb-6 w-full min-h-[40vh] flex flex-col gap-6">
      <fieldset>
        <legend className="text-lg font-medium text-gray-900 dark:text-zinc-100">
          We found the following packages
        </legend>
        <div className="mt-4 divide-y divide-gray-200 dark:divide-zinc-700">
          {packages.map((name, personIdx) => (
            <div
              key={id}
              className="relative flex items-start py-4 hover:opacity-75"
            >
              <div className="min-w-0 flex-1 text-sm">
                <label
                  htmlFor={`person-${id}`}
                  className="select-none font-medium text-gray-700 dark:text-gray-400"
                >
                  {name}
                </label>
              </div>
              <div className="ml-3 flex h-5 items-center">
                <input
                  id={name}
                  name={name}
                  type="checkbox"
                  className="h-6 w-6 rounded-full border-gray-600 text-yellow-500 focus:ring-0 focus:ring-offset-0 focus:outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      </fieldset>
      <button
        onClick={next}
        className="w-full text-center rounded-md outline outline-emerald-400 dark:outline-emerald-500 px-5 py-3 text-md font-medium text-white dark:text-emerald-500 shadow-xl bg-emerald-400 dark:bg-emerald-800/20 hover:bg-emerald-500 dark:hover:bg-emerald-800/60 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 sm:px-10 hover:text-white"
      >
        Give stars to these projects
      </button>
    </div>
  )
}
