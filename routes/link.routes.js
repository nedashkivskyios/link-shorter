const { Router } = require('express')
const Link = require('../models/Link')
const authMiddleware = require('../middleware/auth.middleware')
const config = require('config')
const shortId = require('shortid')
const { check, validationResult } = require('express-validator')

const router = Router()

/**
 * @swagger
 * /api/link/generate:
 *  post:
 *    summary: Generate new Short URL.
 *    description: Post request to DB for generate new URL
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              initialUrl:
 *                type: string
 *                description: URL which needs to be shortened
 *                example: https://example.ex
 *    responses:
 *      201:
 *        summary: Generated Link and info about.
 *        description: The link was created.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                link:
 *                  type: object
 *                  description: Link schema.
 *                  properties:
 *                    initialUrl:
 *                      type: string
 *                      example: https://example.ex
 *                    shortUrl:
 *                      type: string
 *                      example: https://short.sh/t/Hfdsai23U
 *                    code:
 *                      type: string
 *                      example: Hfdsai23U
 *                    date:
 *                      type: date
 *                      example: 2022-03-27
 *                    cliks:
 *                      type: number
 *                      example: 0
 *                    owner:
 *                      type: string
 *                      description: ID from the owner of this abbreviated link. Ref to User MongoDB
 *                      example: Not have an example is MongoDB Types.ObjectID string.
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
 *                        example: initialUrl
 *                      msg:
 *                        type: string
 *                        description: Error text
 *                        example: Field Initial Url must contain a valid url address
 *                      value:
 *                        type: string
 *                        description: False value that came to the server
 *                        example: al;sd;fasdf.als;d
 *      401:
 *        summary: Not autorized.
 *        description: Attempt to generate links without login.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Client not autorized
 *                  example: No authorization
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
  '/generate',
  authMiddleware,
  [
    check('initialUrl', 'Field Initial Url must exist').exists(),
    check('initialUrl', 'Field Initial Url must contain a valid url address').isURL()
  ],
  async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: 'Incorrect data.',
        errors: errors.array(),
      })
    }
    const baseUrl = config.get('baseUrl')
    const {initialUrl} = req.body
    const code = shortId.generate()

    const shortUrl = `${baseUrl}/t/${code}`

    const link = new Link({
      initialUrl, code, shortUrl, owner: req.user.userId
    })

    await link.save()
    res.status(201).json(link)

  } catch (e) {
    res.status(500).json({ message: 'Server error.', errors: e.message })
  }
})

/**
 * @swagger
 * /api/link/:
 *  get:
 *    summary: Get all user Links .
 *    description: Get request to DB to get user-generated links.
 *    responses:
 *      200:
 *        summary: User-generated links.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                links:
 *                  type: array
 *                  description: Array of user links.
 *                  items:
 *                    type: object
 *                    properties:
 *                      initialUrl:
 *                        type: string
 *                        example: https://example.ex
 *                      shortUrl:
 *                        type: string
 *                        example: https://short.sh/t/Hfdsai23U
 *                      code:
 *                        type: string
 *                        example: Hfdsai23U
 *                      date:
 *                        type: date
 *                        example: 2022-03-27
 *                      cliks:
 *                        type: number
 *                        example: 0
 *                      owner:
 *                        type: string
 *                        description: ID from the owner of this abbreviated link. Ref to User MongoDB
 *                        example: Not have an example is MongoDB Types.ObjectID string.
 *      401:
 *        summary: Not autorized.
 *        description: Attempt to generate links without login.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Client not autorized
 *                  example: No authorization
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
router.get('/', authMiddleware, async (req, res) => {
  try {
    const links = await Link.find({owner: req.user.userId})
    res.status(200).json({ links })
  } catch (e) {
    res.status(500).json({ message: 'Server error.', errors: e.message })
  }
})

/**
 * @swagger
 * /api/link/{id}:
 *  get:
 *    summary: Generate new Short URL.
 *    description: Post request to DB for generate new URL
 *    parameters:
 *      - in: path
 *        name: id
 *        require: true
 *        description: String ID of the link to retrieve.
 *        schema:
 *          type: string
 *          example: LKJadlad8983khj
 *    responses:
 *      200:
 *        summary: Link by ID.
 *        description: the link you were looking for
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                link:
 *                  type: object
 *                  description: Link schema.
 *                  properties:
 *                    initialUrl:
 *                      type: string
 *                      example: https://example.ex
 *                    shortUrl:
 *                      type: string
 *                      example: https://short.sh/t/Hfdsai23U
 *                    code:
 *                      type: string
 *                      example: Hfdsai23U
 *                    date:
 *                      type: date
 *                      example: 2022-03-27
 *                    cliks:
 *                      type: number
 *                      example: 0
 *                    owner:
 *                      type: string
 *                      description: ID from the owner of this abbreviated link. Ref to User MongoDB
 *                      example: Not have an example is MongoDB Types.ObjectID string.
 *      400:
 *        summary: Link by ID don't find.
 *        description: Link by ID don't find
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Can't find shorted URL.
 *      401:
 *        summary: Not autorized.
 *        description: Attempt to generate links without login.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Client not autorized
 *                  example: No authorization
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

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id)
    if (!link) {
      return res.status(400).json({message: `Can't find shorted URL`})
    }
    res.status(200).json({ link })
  } catch (e) {
    res.status(500).json({ message: 'Server error.', errors: e.message })
  }
})


module.exports = router
