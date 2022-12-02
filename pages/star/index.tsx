import React, { useEffect } from "react"
import useStore from "../../utils/store"
import AppLayout from "../../layouts/AppLayout"

export default function Index() {
  const step = useStore((state) => state.step)
  const reset = useStore((state) => state.reset)

  useEffect(() => {
    reset()
  }, [reset])

  return <AppLayout>{step.component && <step.component />}</AppLayout>
}
