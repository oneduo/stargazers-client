import React from "react"
import NextLink, { LinkProps } from "next/link"

interface Props {
  children: React.ReactNode
}

const Link = ({ children, ...props }: Props & LinkProps) => {
  return (
    <NextLink
      {...props}
      className="rounded-md border border-emerald-400 dark:outline-emerald-500 px-5 py-3 text-sm font-medium text-white dark:text-emerald-500 shadow-xl bg-emerald-400 dark:bg-emerald-800/20 hover:bg-emerald-500 dark:hover:bg-emerald-800/60 focus:outline-none focus:ring-1 focus:outline-emerald-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed inline-flex justify-center"
    >
      {children}
    </NextLink>
  )
}

export default Link
