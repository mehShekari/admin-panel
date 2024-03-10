const { object, string, ref } = require('yup');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

const UserModels = require("../models/userModel");

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
      const user = await UserModels.findOne({
        where: {
          email: body.email
        }
      });

      if (user) {
        const userClone = user.get({ clone: true });
        const matched = await bcrypt.compare(body.password, userClone.password);

        if (matched) {
          res.status(200)
            .json({
              ok: true,
              message: "successful login",
              authToken: "1ae458787vsd8554"
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
      const data = await UserModels.findAll();
      const existingUser = data.find(_data => _data.email === body.email);

      if (!existingUser) {
        // bcrypt.genSalt(saltRounds, (err, salt) => {
        // if (err) return console.log(err)
        bcrypt.hash(body.password, saltRounds, (err, hash) => {
          if (err) return console.log(err)
          const newBody = {
            ...body,
            password: hash,
            token: uuidv4()
          }
          UserModels.create(newBody).then(() => {
            res.status(200)
              .json({
                ok: true,
                message: "successful register",
                authToken: ""
              })
          });
        });
        // });
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

module.exports = { loginController, registerController }

// type User = InferType<typeof userSchema>;