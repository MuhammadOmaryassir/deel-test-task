const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const { getProfile } = require('../middleware/getProfile');
const { getActiveUserContracts, getContractById } = require('./contracts');

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

module.exports = router;
