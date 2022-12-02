declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_GRAPHQL: string
      NEXT_PUBLIC_PUSHER_API_KEY: string
      NEXT_PUBLIC_PUSHER_CLUSTER: string
    }
  }
}
export {}
