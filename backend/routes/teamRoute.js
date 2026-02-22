const express = require('express');
const router = express.Router();
const {getTeam,addMember} = require('../controllers/teamConttroller');
const {protect} = require('../middleware/authMiddleware');

router.get('/',getTeam)
router.post('/',protect,addMember)

module.exports = router;