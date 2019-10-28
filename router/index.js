'use strict'

const express = require('express')

const apiV1 = require('./v1')

const router = express.Router()

router.get('/', (req, res) => {
    return res.json({ name: 'You know for log' })
})

router.use('/v1', apiV1)

router.use((req, res, next) => {
    return res.json({ error: 404 })
})

module.exports = router
