const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const { getProfile } = require('../middleware/getProfile');

const { getActiveUserContracts, getContractById } = require('./contracts');
const { getUserUnpaidJobs, payJob } = require('./jobs');
const { depositMoney } = require('./balances');

const router = new Router();

router.get(
  '/contracts/:id',
  getProfile,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.profile.id;

    const contract = await getContractById(id, userId);

    if (!contract) {
      return res.status(404).end();
    }

    res.json(contract);
  })
);

router.get(
  '/contracts',
  getProfile,
  asyncHandler(async (req, res) => {
    const userId = req.profile.id;
    const contracts = await getActiveUserContracts(userId);

    res.json(contracts);
  })
);

router.get(
  '/jobs/unpaid',
  getProfile,
  asyncHandler(async (req, res) => {
    const userId = req.profile.id;
    const jobs = await getUserUnpaidJobs(userId);

    res.json(jobs);
  })
);

router.post(
  '/jobs/:id/pay',
  getProfile,
  asyncHandler(async (req, res) => {
    const jobId = req.params.id;
    const clientId = req.profile.id;

    const updatedJob = await payJob(jobId, clientId);

    res.json(updatedJob);
  })
);

router.post(
  '/balances/deposit/:userId',
  asyncHandler(async (req, res) => {
    const clientId = req.params.userId;
    const { amount } = req.body;

    const profile = await depositMoney(clientId, amount);

    res.json(profile);
  })
);

module.exports = router;
