const { Router } = require('express');

const user = require('../controllers/userController');
const checkAuthToken = require('../middlewares/auth');

const router = Router();

router.get("/", checkAuthToken,user.users)

module.exports.userRoute = router;