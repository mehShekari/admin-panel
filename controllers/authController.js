const { object, string, ref, mixed } = require('yup');;

const loginSchema = object({
  email: string().email().required(),
  password: string().min(4).max(255).required()
})

const loginController = async (req, res) => {
  const body = req.body;

  try {
    const isValid = await loginSchema.validate(body)
    if (isValid) {

    } else {

    }
  } catch (error) {

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
    const isValid = await registerSchema.validate(body);
    if (isValid) {
      
    }
  } catch (error) {

  }
}

module.exports = { loginController, registerController }

// type User = InferType<typeof userSchema>;