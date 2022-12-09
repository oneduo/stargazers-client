import create from "zustand"
import Upload from "@/components/Upload"
import Selection from "@/components/Selection"
import Login from "@/components/Login"
import type { Step } from "../types"
import type { Package } from "../generated/graphql"
import splitbee from "@splitbee/web"

const steps: Step[] = [
  {
    key: "upload",
    name: "Upload a lock file",
    component: Upload,
  },
  {
    key: "selection",
    name: "Select packages",
    component: Selection,
  },
  {
    key: "login",
    name: "Login with Github",
    component: Login,
  },
  {
    key: "processing",
    name: "Processing",
  },
  {
    key: "results",
    name: "Finish",
  },
]

export interface State {
  step: Step
  steps: Step[]
  packages: Package[]
  loginUrl?: string
  setStep: (step: Step) => void
  nextStep: () => void
  previousStep: () => void
  setPackages: (packages: Package[]) => void
  replacePackage: (p: Package) => void
  setLoginUrl: (url: string) => void
  reset: () => void
}

const useStore = create<State>()((set, get) => ({
  step: steps[0],
  steps,
  packages: [],
  setStep: (step: Step) => set({ step }),
  nextStep: () => {
    const nextStep = steps[Math.min(steps.findIndex((s) => s.key === get().step.key) + 1, steps.length - 1)]

    splitbee.track("next step", {
      from: get().step.key,
      to: nextStep.key,
    })

    return set((state) => ({
      step: nextStep,
    }))
  },
  previousStep: () => {
    const previousStep = steps[Math.max(steps.findIndex((s) => s.key === get().step.key) - 1, 0)]

    splitbee.track("previous step", {
      from: get().step.key,
      to: previousStep.key,
    })

    return set((state) => ({
      step: previousStep,
    }))
  },
  setPackages: (packages) => {
    splitbee.track("set packages")

    set({ packages })
  },
  setLoginUrl: (url) => {
    splitbee.track("prepare github login")

    set({ loginUrl: url })
  },
  reset: () => {
    set({ step: steps[0], packages: [], loginUrl: undefined })
  },
  replacePackage: (_package) => {
    splitbee.track("handled package")

    set((state) => ({
      packages: state.packages.map((p) => (p.id.toString() === _package.id.toString() ? _package : p)),
    }))
  },
}))

export default useStore
