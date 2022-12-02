import React from "react"

export default function Finish() {
  return (
    <div className="flex flex-col rounded-md bg-zinc-800/60 backdrop-blur-md shadow-xl border-2 border border-zinc-800 p-8 w-full min-h-[40vh]">
      <h2 className="text-4xl text-zinc-200 mb-4 font-bold">Awesome !</h2>
      <h4 className="text-zinc-200 font-semi text-2xl">
        You have just starred
        <span className="text-yellow-500"> {20} packages</span>
      </h4>
    </div>
  )
}
