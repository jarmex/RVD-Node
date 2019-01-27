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
export default {
  Query: {
    weeklysummary,
    transactions,
    daystransaction,
  },
};
