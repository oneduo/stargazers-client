import { gql } from "@apollo/client"

const STAR_MUTATION = gql`
  mutation star($packages: [ID!]) {
    star(packages: $packages)
  }
`

export default STAR_MUTATION
