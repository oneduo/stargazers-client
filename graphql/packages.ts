import { gql } from "@apollo/client"

const PACKAGES_QUERY = gql`
  query packages($session: ID) {
    packages(session: $session) {
      id
      name
      url
      pivot {
        starred_at
        status
      }
    }
  }
`

export default PACKAGES_QUERY
