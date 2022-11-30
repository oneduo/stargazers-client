import { useId } from "react"

export default function Sponsors() {
  const id = useId()

  return (
    <div className="w-full">
      <p className="text-center text-lg font-semibold text-zinc-600">
        Sponsored by
      </p>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3 lg:mt-8">
        {Array.from(Array(1)).map(() => (
          <div
            key={id}
            className="col-span-1 flex justify-center bg-gray-50/20 dark:bg-zinc-800 py-8 px-8 rounded-lg md:col-start-2"
          >
            <img
              className="max-h-12"
              src="https://tailwindui.com/img/logos/transistor-logo-gray-400.svg"
              alt="Workcation"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
