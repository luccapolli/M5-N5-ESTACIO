const express = require('express');
const router = express.Router();
const { redirectUser } = require('../controllers/redirectController');

router.get('/redirect', redirectUser);

module.exports = router;
