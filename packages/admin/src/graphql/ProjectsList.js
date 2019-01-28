import { gql } from 'apollo-boost';

export const QueryProjectListGQL = gql`
  query allprojects {
    getprojects {
      sid
      accountSid
      dateCreated
      dateUpdated
      shortcode
      friendlyName
    }
  }
`;

export const ActivateShortCodeGQL = gql`
  mutation activateProject(
    $sid: String!
    $shortcode: String!
    $friendlyName: String!
  ) {
    activateProject(
      sid: $sid
      shortcode: $shortcode
      friendlyName: $friendlyName
    ) {
      result
      message
    }
  }
`;

export const RefreshProjectGQL = gql`
  mutation refreshProject($sid: String!, $shortcode: String!) {
    refreshProject(sid: $sid, shortcode: $shortcode) {
      result
      message
    }
  }
`;
