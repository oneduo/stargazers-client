import create from "zustand"
import Upload from "@/components/Upload"
import Selection from "@/components/Selection"
import Login from "@/components/Login"
import type { Step } from "../types"
import type { Package } from "../generated/graphql"
import { devtools } from "zustand/middleware"

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

interface State {
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

const useStore = create<State>()(
  devtools((set) => ({
    step: steps[0],
    steps,
    packages: [],
    setStep: (step: Step) => set({ step }),
    nextStep: () =>
      set((state) => ({
        step: steps[Math.min(steps.findIndex((s) => s.key === state.step.key) + 1, steps.length - 1)],
      })),
    previousStep: () =>
      set((state) => ({
        step: steps[Math.max(steps.findIndex((s) => s.key === state.step.key) - 1, 0)],
      })),
    setPackages: (packages) => {
      set({ packages })
    },
    setLoginUrl: (url) => {
      set({ loginUrl: url })
    },
    reset: () => {
      set({ step: steps[0], packages: [], loginUrl: undefined })
    },
    replacePackage: (_package) => {
      set((state) => ({
        packages: state.packages.map((p) => (p.id.toString() === _package.id.toString() ? _package : p)),
      }))
    },
  })),
)

export default useStore
