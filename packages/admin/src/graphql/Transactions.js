import { gql } from 'apollo-boost';

export const QueryWeeklySummaryGQL = gql`
  {
    weeklysummary {
      DayName
      Count
    }
  }
`;

export const QueryMSISDNTransactionsGQL = gql`
  query transactions($msisdn: String!, $feedcount: Int) {
    transactions(msisdn: $msisdn, feedcount: $feedcount) {
      id
      cellid
      imsi
      shortcode
      moduleName
      moduleLabel
      stepName
      stepKind
      flowend
      replyMessage
      msisdn
      sessionid
      createdAt
    }
  }
`;

export const QueryDayTransGQL = gql`
  {
    daystransaction {
      id
      cellid
      imsi
      shortcode
      moduleName
      moduleLabel
      stepName
      stepKind
      flowend
      replyMessage
      msisdn
      sessionid
      createdAt
    }
  }
`;
