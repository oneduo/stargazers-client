import Footer from "@/components/Footer"
import React, { useState } from "react"
import { HeroIllustration } from "@/components/HeroIllustration"
import { Logo } from "@/components/Logo"
import Steps from "@/components/Steps"
import Upload from "@/components/Upload"
import { Step } from "../types"
import Selection from "@/components/Selection"
import Login from "@/components/Login"
import Finish from "@/components/Finish"

const steps = [
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
    key: "results",
    name: "Finish",
    component: Finish,
  },
]

export default function Start() {
  const [step, setStep] = useState<Step>(steps[0])

  const next = () => {
    setStep(steps[steps.findIndex((s) => s.key === step.key) + 1])
  }

  return (
    <div className="isolate overflow-hidden min-h-screen">
      <div className="overflow-hidden relative">
        <HeroIllustration />
        <div className="overflow-hidden pt-8 sm:pt-12 lg:relative lg:py-36 max-w-4xl mx-auto">
          <div className="w-full px-4 grid grid-cols-12">
            <div className="col-span-3">
              <div className="w-36 text-black dark:text-white">
                <Logo />
              </div>
              <div className="mt-20">
                <Steps steps={steps} current={step} />
              </div>
            </div>
            <div className="col-span-9">
              <step.component next={next} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
