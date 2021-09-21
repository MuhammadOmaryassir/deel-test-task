const { Op } = require('sequelize');
const { Contract, Job, Profile, sequelize } = require('../model');

async function getClientUnpaidJobsSum(clientId) {
  return Job.sum('price', {
    where: {
      paid: false,
    },
    include: [
      {
        model: Contract,
        required: true,
        attributes: [],
        where: {
          status: { [Op.ne]: 'terminated' },
          ClientId: clientId,
        },
      },
    ],
  });
}

async function depositMoney(clientId, amount) {
  const unpaidSum = await getClientUnpaidJobsSum(clientId);
  const depositThreshold = unpaidSum * 0.25;

  if (amount > depositThreshold) {
    throw new Error('Deposit exceeds the threshold');
  }

  const result = await sequelize.transaction(async (t) => {
    const client = await Profile.findByPk(clientId, { transaction: t });

    // drop floating fractions
    client.balance = parseFloat((client.balance + amount).toFixed(2));

    await client.save({ transaction: t });

    return client;
  });

  return result;
}

module.exports = {
  depositMoney,
};