import { gql } from "@apollo/client"

const UPLOAD_MUTATION = gql`
  mutation upload($upload: Upload!) {
    upload(upload: $upload) {
      id
      name
      url
      pivot {
        starred_at
      }
    }
  }
`

export default UPLOAD_MUTATION
