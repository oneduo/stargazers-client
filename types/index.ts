export interface Step {
  key: string
  name: string
  component?: () => JSX.Element | null
}
