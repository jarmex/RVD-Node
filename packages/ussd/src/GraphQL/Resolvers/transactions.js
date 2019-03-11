import { Logger } from '../../util';

const { printerror } = Logger('trans');

const weeklysummary = async (_, __, { models }) => {
  const { Transactions, sequelize } = models;
  const pastWeek = new Date();
  pastWeek.setDate(pastWeek.getDate() - 7);
  try {
    return await Transactions.findAll({
      attributes: [
        [
          sequelize.fn(
            'COUNT',
            sequelize.fn('DISTINCT', sequelize.col('sessionid')),
          ),
          'Count',
        ],
        [sequelize.fn('DAYNAME', sequelize.col('createdAt')), 'DayName'],
      ],
      where: sequelize.where(
        sequelize.fn('DATE', sequelize.col('createdAt')),
        ' > ',
        sequelize.fn('DATE', pastWeek),
      ),
      group: [sequelize.fn('DAYNAME', sequelize.col('createdAt'))],
      raw: true,
    });
  } catch (error) {
    printerror(error.message);
    throw error;
  }
};

const transactions = (_, { msisdn, feedcount = 0 }, { models }) => {
  const { Transactions, Sequelize } = models;
  const { Op } = Sequelize;
  try {
    return Transactions.findAll({
      where: {
        msisdn,
        id: {
          [Op.gt]: feedcount,
        },
      },
      limit: 100,
      order: [['createdAt', 'DESC']],
    });
  } catch (error) {
    printerror(error.message);
    throw error;
  }
};

const daystransaction = (_, __, { models }) => {
  const { Transactions, sequelize } = models;
  try {
    return Transactions.findAll({
      where: sequelize.where(
        sequelize.fn('DATE', sequelize.col('createdAt')),
        ' = ',
        sequelize.fn('DATE', new Date()),
      ),
    });
  } catch (error) {
    printerror(error.message);
    throw error;
  }
};

const queryModuleHitz = async (
  _,
  { flowend, startDate, endDate },
  { models },
) => {
  const { Transactions, sequelize, Sequelize } = models;
  const { Op } = Sequelize;
  try {
    const flowtype = flowend === false ? 0 : 1;
    const querydata = { flowtype, startDate, endDate };
    if (!startDate) {
      // only a week report
      const pastWeek = new Date();
      pastWeek.setDate(pastWeek.getDate() - 8);
      querydata.startDate = pastWeek;
    }

    if (!endDate) {
      const nextDay = new Date();
      querydata.endDate = nextDay;
    }

    // select moduleName, moduleLabel, count(distinct msisdn) as `count` from rvdnode.Transactions
    // where flowend = 1 and (date(createdAt) between Date('2018-03-06') and Date('2019-03-06'))
    // group by moduleName, moduleLabel
    // order by countbymsisdn desc;

    return Transactions.findAll({
      attributes: [
        'moduleName',
        'moduleLabel',
        [
          sequelize.fn(
            'COUNT',
            sequelize.fn('DISTINCT', sequelize.col('msisdn')),
          ),
          'count',
        ],
      ],
      where: {
        flowend: querydata.flowtype,
        createdAt: {
          [Op.between]: [querydata.startDate, querydata.endDate],
        },
      },
      group: ['moduleName', 'moduleLabel'],
      raw: true,
    });
  } catch (error) {
    printerror(error.message);
    throw error;
  }
};

/**
 * Query the hits by date range and group by day
 * @param {Object} obj
 * @param {Object} param1 the function arguments
 * @param {Object} context
 */
const queryHitzByDay = async (
  _,
  { flowend, startDate, endDate },
  { models },
) => {
  const { Transactions, sequelize, Sequelize } = models;
  const { Op } = Sequelize;
  try {
    const flowtype = flowend === false ? 0 : 1;
    const querydata = { flowtype, startDate, endDate };
    if (!startDate) {
      // only a week report
      const pastWeek = new Date();
      pastWeek.setDate(pastWeek.getDate() - 8);
      querydata.startDate = pastWeek;
    }

    if (!endDate) {
      const nextDay = new Date();
      querydata.endDate = nextDay;
    }

    return Transactions.findAll({
      attributes: [
        'moduleName',
        'moduleLabel',
        [
          sequelize.fn(
            'COUNT',
            sequelize.fn('DISTINCT', sequelize.col('msisdn')),
          ),
          'count',
        ],
        [
          sequelize.fn('DATE_FORMAT', sequelize.col('createdAt'), '%d %b %Y'),
          'Date',
        ],
      ],
      where: {
        flowend: querydata.flowtype,
        createdAt: {
          [Op.between]: [querydata.startDate, querydata.endDate],
        },
      },
      group: ['moduleName', 'moduleLabel', 'Date'],
      order: [[sequelize.literal('count'), 'desc']],
      raw: true,
    });
  } catch (error) {
    printerror(error.message);
    throw error;
  }
};

const queryMsisdnCount = async (_, { startDate, endDate }, { models }) => {
  const { Transactions, sequelize, Sequelize } = models;
  const { Op } = Sequelize;
  try {
    const querydata = { startDate, endDate };
    if (!startDate) {
      // only a week report
      const pastWeek = new Date();
      pastWeek.setDate(pastWeek.getDate() - 8);
      querydata.startDate = pastWeek;
    }

    if (!endDate) {
      const nextDay = new Date();
      querydata.endDate = nextDay;
    }

    return Transactions.findAll({
      attributes: [
        'msisdn',
        [
          sequelize.fn(
            'COUNT',
            // sequelize.fn('DISTINCT', sequelize.col('msisdn')),
            sequelize.col('msisdn'),
          ),
          'count',
        ],
        [
          sequelize.fn('DATE_FORMAT', sequelize.col('createdAt'), '%d %b %Y'),
          'Date',
        ],
      ],
      where: {
        createdAt: {
          [Op.between]: [querydata.startDate, querydata.endDate],
        },
      },
      group: ['msisdn', 'Date'],
      order: [[sequelize.literal('count'), 'desc']],
      raw: true,
    });
  } catch (error) {
    printerror(error.message);
    throw error;
  }
};

const querytransByday = async (_, { startDate, endDate }, { models }) => {
  const { Transactions, sequelize, Sequelize } = models;
  const { Op } = Sequelize;
  try {
    const querydata = { startDate, endDate };
    if (!startDate) {
      // only a week report
      const pastWeek = new Date();
      pastWeek.setDate(pastWeek.getDate() - 8);
      querydata.startDate = pastWeek;
    }

    if (!endDate) {
      const nextDay = new Date();
      querydata.endDate = nextDay;
    }

    return Transactions.findAll({
      attributes: [
        [
          sequelize.fn(
            'COUNT',
            sequelize.fn('DISTINCT', sequelize.col('msisdn')),
          ),
          'count',
        ],
        [
          sequelize.fn('DATE_FORMAT', sequelize.col('createdAt'), '%d %b %Y'),
          'Date',
        ],
      ],
      where: {
        createdAt: {
          [Op.between]: [querydata.startDate, querydata.endDate],
        },
      },
      group: ['Date'],
      order: [[sequelize.literal('count'), 'desc']],
      raw: true,
    });
  } catch (error) {
    printerror(error.message);
    throw error;
  }
};

const toptrans = async (_, __, { models }) => {
  const { Transactions } = models;
  try {
    return Transactions.findAll({
      limit: 100,
      order: [['id', 'DESC']],
    });
  } catch (error) {
    printerror(error.message);
    throw error;
  }
};

export default {
  Query: {
    weeklysummary,
    transactions,
    daystransaction,
    queryModuleHitz,
    queryHitzByDay,
    queryMsisdnCount,
    querytransByday,
    toptrans,
  },
};
