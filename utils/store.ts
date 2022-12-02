import create from "zustand"
import Upload from "@/components/Upload"
import Selection from "@/components/Selection"
import Login from "@/components/Login"
import Processing from "@/components/Processing"
import Finish from "@/components/Finish"
import type { Step } from "../types"
import type { Package } from "../generated/graphql"

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
    name: "Running",
    component: Processing,
  },
  {
    key: "results",
    name: "Finish",
    component: Finish,
  },
]

interface State {
  step: Step
  steps: Step[]
  packages: Package[]
  loginUrl?: string
  nextStep: () => void
  previousStep: () => void
  setPackages: (packages: Package[]) => void
  setLoginUrl: (url: string) => void
}

const useStore = create<State>()((set) => ({
  step: steps[0],
  steps,
  packages: [],
  nextStep: () =>
    set((state) => ({
      step: steps[
        Math.min(
          steps.findIndex((s) => s.key === state.step.key) + 1,
          steps.length - 1,
        )
      ],
    })),
  previousStep: () =>
    set((state) => ({
      step: steps[
        Math.max(steps.findIndex((s) => s.key === state.step.key) - 1, 0)
      ],
    })),
  setPackages: (packages) => {
    set({ packages })
  },
  setLoginUrl: (url) => {
    set({ loginUrl: url })
  },
}))

export default useStore
