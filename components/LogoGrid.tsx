import React, { useEffect, useMemo, useRef, useState } from "react"
import clsx from "clsx"
import { useInView } from "framer-motion"
import Image from "next/image"

interface Project {
  name: string
}

function Card({ name, className, ...props }: Project & React.HTMLProps<HTMLDivElement>) {
  const animationDelay = useMemo(() => {
    const possibleAnimationDelays = ["0s", "0.1s", "0.2s", "0.3s", "0.4s", "0.5s"]

    return possibleAnimationDelays[Math.floor(Math.random() * possibleAnimationDelays.length)]
  }, [])

  return (
    <div
      className={clsx(
        "group animate-fade-in rounded-3xl bg-white dark:bg-zinc-800 backdrop-blur-3xl p-4 md:p-8 aspect-square flex items-center justify-center opacity-0 shadow-sm shadow-zinc-900/20",
        className,
      )}
      style={{ animationDelay }}
      {...props}
    >
      <img
        src={`/assets/logo/${name}`}
        className="text-white fill-white opacity-70 group-hover:opacity-100 transition-opacity duration-300"
        alt={name}
      />
    </div>
  )
}

function split(array: Project[], numParts: number) {
  let result: any = []

  for (let i = 0; i < array.length; i++) {
    let index = i % numParts

    if (!result[index]) {
      result[index] = []
    }

    result[index].push(array[i])
  }

  return result
}

function Column({
  className,
  projects,
  projectClassName = () => "",
  msPerPixel = 0,
}: React.HTMLProps<HTMLDivElement> & {
  projects: Project[]
  msPerPixel?: number
  projectClassName?: (index: number) => string
}) {
  let columnRef = useRef<HTMLDivElement>(null)
  let [columnHeight, setColumnHeight] = useState(0)
  let duration = `${columnHeight * msPerPixel}ms`

  useEffect(() => {
    if (columnRef.current === undefined || columnRef.current === null) {
      return
    }

    let resizeObserver = new window.ResizeObserver(() => {
      setColumnHeight(columnRef.current?.offsetHeight ?? 0)
    })

    resizeObserver.observe(columnRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <div
      ref={columnRef}
      className={clsx("animate-marquee space-y-8 py-4", className)}
      // @ts-ignore
      style={{ "--marquee-duration": duration }}
    >
      {projects.concat(projects).map((review, index) => (
        <Card
          key={index}
          aria-hidden={index >= projects.length}
          className={projectClassName(index % projects.length)}
          {...review}
        />
      ))}
    </div>
  )
}

export default function LogoGrid({ logos }: { logos: string[] }) {
  const projects = useMemo(() => {
    return logos.map((name) => ({ name }))
  }, [logos])

  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.4 })
  let columns = split(projects, 3)

  columns = [columns[0], columns[1], split(columns[2], 2)]

  return (
    <div
      ref={containerRef}
      className="relative -mx-4 mt-16 grid h-[20rem] md:h-[49rem] max-h-[150vh] grid-cols-3 items-start gap-8 overflow-hidden px-4 sm:mt-20 lg:grid-cols-4"
    >
      {logos.length && isInView && (
        <>
          <Column projects={[...columns[0], ...columns[2].flat(), ...columns[1]]} msPerPixel={10} />
          <Column projects={[...columns[1], ...columns[2][1]]} msPerPixel={15} />
          <Column projects={columns[2].flat()} msPerPixel={10} />
        </>
      )}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 md:h-80 bg-gradient-to-b from-white dark:from-zinc-900" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 md:h-80 bg-gradient-to-t from-white dark:from-zinc-900" />
    </div>
  )
}
