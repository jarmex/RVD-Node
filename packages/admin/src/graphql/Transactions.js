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

export const QueryHitzByDayGQL = gql`
  query queryHitzByDay($flowend: Boolean, $startDate: DATE, $endDate: DATE) {
    queryHitzByDay(
      flowend: $flowend
      startDate: $startDate
      endDate: $endDate
    ) {
      count
      Date
      moduleName
      moduleLabel
    }
  }
`;

export const QueryMSISDNCountGQL = gql`
  query queryMsisdnCount($startDate: DATE, $endDate: DATE) {
    queryMsisdnCount(startDate: $startDate, endDate: $endDate) {
      msisdn
      count
      Date
    }
  }
`;

export const QueryTop100TransGQL = gql`
  query {
    toptrans {
      id
      msisdn
      cellid
      shortcode
      sessionid
      moduleName
      moduleLabel
      stepName
      stepKind
      flowend
      replyMessage
      createdAt
    }
  }
`;
