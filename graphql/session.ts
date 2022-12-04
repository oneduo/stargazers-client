import { gql } from "@apollo/client"

const SESSION_QUERY = gql`
  query session($session: ID!) {
    session(session: $session) {
      id
      processed_at
      stargazer {
        username
      }
      packages {
        id
        name
        url
        image
        pivot {
          starred_at
          status
        }
      }
    }
  }
`

export default SESSION_QUERY
