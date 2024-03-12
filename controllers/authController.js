const { object, string, ref } = require('yup');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const UsersModel = require("../models/userModel");
const TokensModel = require('../models/tokens');

const loginSchema = object({
  email: string().email("this is not valid email").required("this is required"),
  password: string().min(4).max(255).required("this is required")
})

const saltRounds = 10;

const loginController = async (req, res) => {
  const body = req.body;

  try {
    const isValid = await loginSchema.validate(body, {
      abortEarly: false, // send all errors at once
      strict: true
    })
    if (isValid) {
      const user = await UsersModel.findOne({
        where: {
          email: body.email
        }
      });

      if (user) {
        const userClone = user.get({ clone: true });
        const matched = await bcrypt.compare(body.password, userClone.password);

        if (matched) {
          const accessToken = generateAccessToken({ id: userClone.token });
          const refreshToken = jwt.sign({ id: userClone.token }, process.env.REFRESH_SECRET_TOKEN);

          await TokensModel.create({ token: refreshToken })
          res.status(200)
            .json({
              ok: true,
              message: "successful login",
              authToken: accessToken,
              refreshToken: refreshToken
            })
        } else {
          return res.json({ ok: false, message: 'userName or password is not correct' });
        }
      } else {
        res.status(404)
          .json({
            ok: false,
            message: "user not found!",
          })
      }
    } else {
      res.status(400)
        .json({ ok: false, message: "this is not ok!" })
    }
  } catch (error) {
    const errorSchema = error.inner?.reduce((_prev, _curr, _index) => ({
      ..._prev, [_curr.path]: error.errors[_index]
    }), {})
    console.log(error);
    res.status(416)
      .json({ ok: false, message: errorSchema })
  }
}

const registerSchema = object({
  fullName: string().min(4).max(255).required(),
  userName: string().min(4).max(255),
  password: string().min(4).max(255).required(),
  confirmPassword: string().required().oneOf([ref("password")]),
  email: string().email().required()
})

const registerController = async (req, res) => {
  const body = req.body;
  try {
    const isValid = await registerSchema.validate(body, {
      abortEarly: false,
      strict: true
    });
    if (isValid) {
      const user = await UsersModel.findOne({
        where: {
          email: body.email
        }
      });

      if (!user) {
        bcrypt.hash(body.password, saltRounds, (err, hash) => {
          if (err) return console.log(err)
          const newBody = {
            ...body,
            password: hash,
            token: uuidv4()
          }
          UsersModel.create(newBody).then(() => {
            res.status(200)
              .json({
                ok: true,
                message: "successful register",
                authToken: ""
              })
          });
        });
      } else {
        res.status(404)
          .json({
            ok: false,
            message: "user already exists!",
          })
      }
    }
  } catch (error) {
    const errorSchema = error.inner?.reduce((_prev, _curr, _index) => ({
      ..._prev, [_curr.path]: error.errors[_index]
    }), {})
    res.status(416)
      .json({ ok: false, message: errorSchema })
  }
}

const refreshTokenController = async (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.status(401).json({ ok: false, message: "error" })

  const token = await TokensModel.findOne({
    where: {
      token: refreshToken
    }
  });

  if (token == null) return res.status(401).json({ ok: false, message: "don't access" })

  const tokenClone = token.get({ clone: true });
  jwt.verify(tokenClone.token, process.env.REFRESH_SECRET_TOKEN, async (err, user) => {
    if (err) return res.status(403).json({ ok: false, err })

    const token = generateAccessToken({ id: user.token });
    res.status(200).json({
      accessToken: token
    })

    try {
      await TokensModel.destroy({ where: { token: tokenClone.token } });
    } catch (error) {
      console.log("error in deleting refreshToken", error)
    }
  });
}

const generateAccessToken = (value) => {
  return accessToken = jwt.sign(value, process.env.ACCESS_SECRET_TOKEN, { expiresIn: '5m' });
}

module.exports = { loginController, registerController, refreshTokenController }

// type User = InferType<typeof userSchema>;