import { ApolloClient, DefaultOptions, InMemoryCache } from "@apollo/client"
import { createUploadLink } from "apollo-upload-client"

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
}

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL,
  cache: new InMemoryCache(),
  link: createUploadLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL,
    credentials: "include",
  }),
  credentials: "include",
  defaultOptions,
})

const ssrClient = (headers?: Record<string, string>) =>
  new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPHQL,
    credentials: "include",
    cache: new InMemoryCache(),
    headers,
  })

export default client

export { ssrClient }
