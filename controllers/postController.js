const PostModel = require("../models/posts");
const userModel = require("../models/userModel");

const getAllPosts = async (req, res) => {
    try {
        const data = await PostModel.findAll({
            include: [{
                model: userModel,
                as: "user",
                attributes: ["fullName", "email"]
            }]
        });
        res.status(200).json({ ok: true, data: data })
    } catch (error) {
        console.log(error)
    }
}

const createNewPost = async (req, res) => {
    try {
        const data = await PostModel.create(req.body);
        res.status(200).json({ ok: true, message: "data added successfully" })
    } catch (error) {
        res.status(200).json({ ok: false, message: error })
    }
}

module.exports = {
    getAllPosts,
    createNewPost
}