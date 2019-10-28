'use strict'

const express = require('express')
const uuid = require('uuid/v4')
const moment = require('moment')

const redis = require('../redis')
const logService = require('../services/logService')

const router = express.Router()

router.get('/', (req, res) => {
    return res.json({ name: 'You know for log' })
})


router.get('/api/v1/log', (req, res) => {
    
    return res.json({ a: uuid(), b: moment().format('DD/MM/YYYY')})
})

router.post('/api/v1/log', (req, res) => {

    const { namespace, key, action, message, user, data } = req.body

    if (!namespace || !key || !message || !action) {
        return res.json({ error: { message: 'missing param' } })
    }

    const id = uuid()
    const created = Date.now()
    
    logService.push({ namespace, key, message, action, user, data, created, id })

    return res.json({ id })
})

router.use((req, res, next) => {
    return res.json({ error: 404 })
})

module.exports = router
