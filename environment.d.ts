declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_GRAPHQL: string
      NEXT_PUBLIC_PUSHER_API_KEY: string
      NEXT_PUBLIC_PUSHER_CLUSTER: string
      NEXT_PUBLIC_APP_URL: string
      API: string
      EDGE_TOKEN: string
      MAINTENANCE_MODE: boolean
    }
  }
}
export {}
