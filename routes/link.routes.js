const { Router } = require('express')
const Link = require('../models/Link')
const authMiddleware = require('../middleware/auth.middleware')
const config = require('config')
const shortId = require('shortid')

const router = Router()

router.post('/generate', authMiddleware, async (req, res) => {
  try {
    const baseUrl = config.get('baseUrl')
    const {initialLink: initialUrl} = req.body
    const code = shortId.generate()

    const existing = await Link.findOne({ initialUrl })
    if (existing) {
      return res.status(200).json({link: existing})
    }

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
router.get('/', authMiddleware, async (req, res) => {
  try {
    const links = await Link.find({owner: req.user.userId})
    res.json(links)
  } catch (e) {
    res.status(500).json({ message: 'Server error.', errors: e.message })
  }
})
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id)
    res.status(200).json(link)
  } catch (e) {
    res.status(500).json({ message: 'Server error.', errors: e.message })
  }
})


module.exports = router
