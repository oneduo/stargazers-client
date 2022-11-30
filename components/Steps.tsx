import { CheckCircleIcon } from "@heroicons/react/20/solid"
import { Step } from "../types"

interface Props {
  steps: Step[]
  current: Step
}

export default function Steps({ current, steps }: Props) {
  return (
    <ol role="list" className="space-y-6">
      {steps.map((step, index) => (
        <li key={step.key}>
          {index < steps.findIndex((s) => s.key === current.key) ||
          index === steps.length - 1 ? (
            <span className="group">
              <span className="flex items-start">
                <span className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center">
                  <CheckCircleIcon
                    className="h-full w-full text-emerald-600 group-hover:text-emerald-400"
                    aria-hidden="true"
                  />
                </span>
                <span className="ml-3 text-sm font-medium text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-300">
                  {step.name}
                </span>
              </span>
            </span>
          ) : step.key === current.key ? (
            <span className="flex items-start" aria-current="step">
              <span
                className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center"
                aria-hidden="true"
              >
                <span className="absolute h-4 w-4 rounded-full bg-emerald-800/60 animate-ping" />
                <span className="relative block h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="ml-3 text-sm font-medium text-emerald-400">
                {step.name}
              </span>
            </span>
          ) : (
            <div className="flex items-start">
              <div
                className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center"
                aria-hidden="true"
              >
                <div className="h-2 w-2 rounded-full bg-zinc-400 group-hover:bg-zinc-200" />
              </div>
              <p className="ml-3 text-sm font-medium text-zinc-400 group-hover:text-zinc-200">
                {step.name}
              </p>
            </div>
          )}
        </li>
      ))}
    </ol>
  )
}
