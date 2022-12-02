import { gql } from "@apollo/client"

const PACKAGE_UPDATED_SUBSCRIPTION = gql`
  subscription packageUpdated($stargazer: ID!) {
    packageUpdated(stargazer: $stargazer) {
      id
      name
      url
      pivot {
        starred_at
      }
    }
  }
`

export default PACKAGE_UPDATED_SUBSCRIPTION
