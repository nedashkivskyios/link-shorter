const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const router = express.Router()
const uuid = require('uuid')


/**
 * @swagger
 * /api/auth/register:
 *  post:
 *    summary: Register new User.
 *    description: Post request to DB for register new User
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              firstName:
 *                type: string
 *                description: The user's name.
 *                example: John
 *              lastName:
 *                type: string
 *                description: The user's surname.
 *                example: Doe
 *              email:
 *                type: string
 *                description: Unique user email.
 *                example: example@example.com
 *              password:
 *                type: string
 *                description: Password length from 6 to 16 characters.
 *                example: qwer1324
 *    responses:
 *      201:
 *        summary: User was successfully created.
 *        description: Request successful, user was created.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: User announce.
 *                  example: ${firstName} ${lastName} has been successfully registered.
 *      422:
 *        summary: Register validation failed.
 *        description: Entered incorrect registration data.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Client validation error text.
 *                  example: Incorrect registration data.
 *                errors:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      location:
 *                        type: string
 *                        description: Error location in payload
 *                        example: body
 *                      param:
 *                        type: string
 *                        descriptin: Зфндщфв parameter in which the error
 *                        example: email
 *                      msg:
 *                        type: string
 *                        description: Error text
 *                        example: Incorrect email
 *                      value:
 *                        type: string
 *                        description: False value that came to the server
 *                        example: adsfasdf
 *      400:
 *        summary: User registered.
 *        description: User already registered.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Client regitration error text
 *                  example: User with this email is already registered
 *      500:
 *        summary: Server error
 *        description: Some server error occered.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: HardCode error text
 *                  example: Something error. Server error.
 *                errors:
 *                  type: string
 *                  description: Specific response from the server.
 *                  example: Some error.
 */
router.post(
  '/register',
  [
    check('email', `The email must have a symbol '@'`).isEmail(),
    check('password', 'Password must be longer than 6 characters')
      .isLength({ min: 6 }),
    check('firstName', 'firstName must be longer than 2 character').isLength({ min: 2 }),
    check('lastName', 'lastName must be longer than 2 character').isLength({ min: 2 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).json({
          message: 'Incorrect registration data.',
          errors: errors.array(),
        })
      }
      const { email, password, firstName, lastName } = req.body
      const candidate = await User.findOne({ email })
      if (candidate) {
        return res.status(400).json({ message: 'User with this email is already registered' })
      }
      const hashedPass = await bcrypt.hashSync(password, 12)
      const user = new User({
        userId: uuid.v1(),
        password: hashedPass,
        email, firstName, lastName,
      })

      await user.save()

      res.status(201).json({ message: `${firstName} ${lastName} has been successfully registered.` })

    } catch (e) {
      res.status(500).json({ message: 'Server error.', errors: e.message })
    }
  })

/**
 * @swagger
 * /api/auth/login:
 *  post:
 *    summary: Login in app.
 *    description: Post request to DB for sign in
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                require: true
 *                description: Unique user email.
 *                example: example@example.com
 *              password:
 *                type: string
 *                require: true
 *                description: Password length from 6 to 16 characters.
 *                example: qwer1324
 *    responses:
 *      200:
 *        summary: User Signing in App.
 *        description: Request successful, user sign in.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                token:
 *                  type: string
 *                  description: Response session token.
 *                  example: Not have an example is jwt string token
 *                userId:
 *                  type: string
 *                  description: Logged in user ID
 *                  example: Not have an example is MongoDB Types.ObjectID string
 *      422:
 *        summary: Register validation failed.
 *        description: Entered incorrect registration data.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Client validation error text.
 *                  example: Incorrect registration data.
 *                errors:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      location:
 *                        type: string
 *                        description: Error location in payload
 *                        example: body
 *                      param:
 *                        type: string
 *                        descriptin: Parameter in which the error
 *                        example: email
 *                      msg:
 *                        type: string
 *                        description: Error text
 *                        example: Incorrect email
 *                      value:
 *                        type: string
 *                        description: False value that came to the server
 *                        example: adsfasdf
 *      400:
 *        summary: Error trying to log in.
 *        description: Invalid login or password entered when trying to sign in.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Client signing in error text
 *                  example: Incorrect password
 *      500:
 *        summary: Server error
 *        description: Some server error occered.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: HardCode error text
 *                  example: Something error. Server error.
 *                errors:
 *                  type: string
 *                  description: Specific response from the server.
 *                  example: Some error.
 */
router.post(
  '/login',
  [
    check('email', 'Incorrect email or password').normalizeEmail().isEmail(),
    check('password', 'Incorrect email or password').exists().isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).json({
          message: 'Incorrect login data.',
          errors: errors.array(),
        })
      }

      const { email, password } = req.body
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ message: 'User not found' })
      }
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(400).json({ message: 'Incorrect password' })
      }
      const token = jwt.sign(
        { userId: user.id },
        config.get('jwtSecret'),
        { expiresIn: '24h' },
      )
      res.status(200).json({ token, userId: user.id })

    } catch (e) {
      res.status(500).json({ message: 'Something error. Server error.', errors: e.message })
    }
  })


/**
 * @swagger
 * /api/auth/check:
 *  post:
 *    summary: Validation token regenerate.
 *    description: Request to check the validity of the authorization token.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              token:
 *                type: string
 *                require: true
 *                description: Unique user validation token.
 *                example: Not have an example is jwt string token
 *              userId:
 *                type: string
 *                require: true
 *                description: The identity of the user to whom the token belongs.
 *                example: Not have an example is MongoDB Types.ObjectID string
 *    responses:
 *      200:
 *        summary: User Signing in App.
 *        description: Request successful, user sign in.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                token:
 *                  type: string
 *                  description: Response session token.
 *                  example: Not have an example is jwt string token
 *                userId:
 *                  type: string
 *                  description: Logged in user ID
 *                  example: Not have an example is MongoDB Types.ObjectID string
 *      401:
 *        summary: Not autorized.
 *        description: Token expires.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Autorization token expire
 *                  example: You need to log in.
 *      500:
 *        summary: Server error
 *        description: Some server error occered.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: HardCode error text
 *                  example: Something error. Server error.
 *                errors:
 *                  type: string
 *                  description: Specific response from the server.
 *                  example: Some error.
 */
router.post('/check', async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }
  try {
    const { token, userId } = req.body
    const user = await User.findOne({ id: userId })
    if (!token) {
      return res.status(401).json({ message: 'You need to log in.' })
    }
    const newToken = jwt.sign(
      { userId: user.id },
      config.get('jwtSecret'),
      { expiresIn: '24h' },
    )
    res.status(200).json({ token: newToken, userId: user.id })
  } catch (e) {
    res.status(500).json({ message: 'Something error. Server error.', errors: e.message })
  }
})


module.exports = router
