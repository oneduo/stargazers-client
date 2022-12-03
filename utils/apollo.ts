import { ApolloClient, InMemoryCache } from "@apollo/client"
import { createUploadLink } from "apollo-upload-client"

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL,
  cache: new InMemoryCache(),
  link: createUploadLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL,
    credentials: "include",
  }),
  credentials: "include",
})

export default client
