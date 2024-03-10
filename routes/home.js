const { Router } = require('express');

const router = Router();

router.get("/", (req, res) =>
{
    res.send("server is running ! ✨🎉")
})

module.exports = router;