import { gql } from 'apollo-boost';

export const LoginGQL = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      sid
      organizationSid
      status
      emailAddress
      friendlyName
      role
      type
      dateCreated
      dateUpdated
    }
  }
`;
