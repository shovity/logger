'use strict'

const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    res.json({ name: 'You know for logging' })
})

module.exports = router
