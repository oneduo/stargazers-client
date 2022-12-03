import { gql } from "@apollo/client"

const STATS_QUERY = gql`
  {
    statistics {
      projectsCount
      usersCount
      starsCount
    }
  }
`

export default STATS_QUERY
