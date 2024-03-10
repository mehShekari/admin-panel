const userModel = require('../models/userModel');

exports.users = async (req, res) =>
{
  try {
    const data = userModel.findAll()
    res
      .status(200)
      .json({
        ok: true,
        data
      })

  } catch (error) {
    res
      .status(400)
      .json({ ok: false, error: error })

  }
}