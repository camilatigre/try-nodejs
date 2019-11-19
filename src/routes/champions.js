const express = require('express');
const router = express.Router();
const championsController = require('../requests/champions');

router.get('/', championsController.listChampions);
router.post('/', championsController.createChampion);

module.exports = router;