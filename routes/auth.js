const { Router } = require('express');
const { loginController, registerController, refreshTokenController } = require('../controllers/authController');

const router = Router();

router.post("/login", loginController);
router.post("/register", registerController);
router.post("/token", refreshTokenController);

module.exports = router;