const { Router } = require('express');

const { getAllUsers, createNewUser } = require('../controllers/userController');
const checkAuthToken = require('../middlewares/auth');

const router = Router();

router.get("/", checkAuthToken, getAllUsers);
router.get("/create", checkAuthToken, createNewUser);

module.exports.userRoute = router;