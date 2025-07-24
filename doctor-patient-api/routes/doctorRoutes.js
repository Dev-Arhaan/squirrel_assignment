const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

router.post('/', doctorController.registerDoctor);
router.get('/search', doctorController.searchDoctors);

module.exports = router;