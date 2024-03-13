const userModel = require('../models/userModel');

const getAllUsers = async (req, res) => {
  try {
    const data = await userModel.findAll({
      attributes: ["fullName", "email", "token"]
    })
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

const createNewUser = async (req, res) => {
  try {
    const data = await userModel.create(req.body)
    res.status(200).json({
      ok: true,
      data
    })
  } catch (err) {
    res.status(400).json({
      ok: false,
      error: err
    })
  }
}

module.exports = {
  getAllUsers,
  createNewUser
}