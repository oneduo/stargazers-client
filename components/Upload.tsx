import React, { useCallback, useEffect } from "react"
import { CloudArrowUpIcon } from "@heroicons/react/24/outline"
import { useDropzone } from "react-dropzone"
import clsx from "clsx"
import Spinner from "@/components/Spinner"
import { useMutation } from "@apollo/client"
import UPLOAD_MUTATION from "@/graphql/upload"
import useStore from "@/utils/store"
import type { Package } from "@/generated/graphql"
import { captureException } from "@sentry/core"

export default function Upload() {
  const [mutate, { data, loading, error }] = useMutation<{ upload: Package[] }>(UPLOAD_MUTATION)

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      try {
        await mutate({ variables: { upload: acceptedFiles[0] } })
      } catch (e) {
        captureException(e)
      }
    },
    [mutate],
  )

  const setPackages = useStore((state) => state.setPackages)
  const nextStep = useStore((state) => state.nextStep)

  useEffect(() => {
    if (data?.upload?.length) {
      setPackages(data.upload)
      nextStep()
    }
  }, [data, nextStep, setPackages])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <>
      <div
        {...getRootProps({
          className: clsx(
            "flex justify-center items-center rounded-md bg-zinc-100 dark:bg-zinc-800/60 backdrop-blur-md shadow-xl border border-zinc-200 dark:border-zinc-800 px-6 pt-5 pb-6 w-full min-h-[40vh]",
            isDragActive && "border-emerald-500",
          ),
        })}
      >
        <input {...getInputProps()} />
        <div className="space-y-2 text-center">
          {loading ? (
            <Spinner className="text-emerald-500 h-10 w-10" />
          ) : (
            <div className="flex flex-col gap-4">
              <CloudArrowUpIcon className="mx-auto h-12 w-12 text-zinc-400" />
              <div className="flex text-sm text-zinc-300">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md font-medium text-emerald-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-emerald-500 focus-within:ring-offset-2 hover:text-emerald-500"
                >
                  <span>Upload a file</span>
                </label>
                <p className="pl-1 text-zinc-500">or drag and drop a file here</p>
              </div>
              <div className="inline-flex gap-2 text-xs text-zinc-400 items-center justify-center">
                <code className="bg-zinc-200 dark:bg-zinc-900 py-1 px-2 rounded-lg">composer.lock</code>
                <span>or</span>
                <code className="bg-zinc-200 dark:bg-zinc-900 py-1 px-2 rounded-lg">package-lock.json</code>
              </div>
              <p className="text-xs text-zinc-400 dark:text-zinc-700">json file only, up to 10MB</p>
            </div>
          )}
        </div>
      </div>
      {error && (
        <div className="text-red-500 text-center w-full mt-2 bg-red-800/20 border border-red-800 p-2 rounded-lg text-sm">
          We were unable to process your file. Reason:{" "}
          {
            //@ts-ignore
            error.graphQLErrors[0].extensions.validation.upload[0]
          }
        </div>
      )}
    </>
  )
}
