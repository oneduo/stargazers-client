import React, { useCallback, useEffect, useState } from "react"
import { CloudArrowUpIcon } from "@heroicons/react/24/outline"
import { useDropzone } from "react-dropzone"
import clsx from "clsx"
import { StepComponentProps } from "../types"

export default function Upload({ next }: StepComponentProps) {
  const [file, setFile] = useState<File>()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  useEffect(() => {
    if (file) {
      next()
    }
  }, [file, next])

  return (
    <div
      {...getRootProps({
        className: clsx(
          "flex justify-center items-center rounded-md bg-zinc-800/60 backdrop-blur-md shadow-xl border-2 border border-zinc-800 px-6 pt-5 pb-6 w-full min-h-[40vh]",
          isDragActive && "border-emerald-500",
        ),
      })}
    >
      <input {...getInputProps()} />
      <div className="space-y-2 text-center">
        <CloudArrowUpIcon className="mx-auto h-12 w-12 text-zinc-400" />
        <div className="flex text-sm text-zinc-600">
          <label
            htmlFor="file-upload"
            className="relative cursor-pointer rounded-md font-medium text-emerald-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-emerald-500 focus-within:ring-offset-2 hover:text-emerald-500"
          >
            <span>Upload a file</span>
          </label>
          <p className="pl-1">by clicking or drag and drop a file here</p>
        </div>
        <p className="text-xs text-zinc-700">json file only, up to 10MB</p>
      </div>
    </div>
  )
}
