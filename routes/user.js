const { Router } = require('express');

const user = require('../controllers/userController');

const router = Router();

router.get("/", user.users)

module.exports.userRoute = router;