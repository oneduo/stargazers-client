import { FC } from "react"

export interface Step {
  key: string
  name: string
  component: FC<StepComponentProps>
}

export interface StepComponentProps {
  next: () => void
}
