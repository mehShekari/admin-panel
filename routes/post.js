const { Router } = require("express");
const checkAuthToken = require('../middlewares/auth');

const { getAllPosts, createNewPost } = require("../controllers/postController");

const router = Router();

router.get("/", checkAuthToken, getAllPosts);
router.post("/create", checkAuthToken, createNewPost);

module.exports = router;