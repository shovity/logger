'use strict'

const express = require('express')
const uuid = require('uuid/v4')
const moment = require('moment')

const redis = require('../redis')

const router = express.Router()

router.get('/', (req, res) => {
    return res.json({ name: 'You know for logging' })
})


router.get('/api/v1/log', (req, res) => {
    
    return res.json({ a: uuid(), b: moment().format('DD/MM/YYYY')})
})

router.post('/api/v1/log', (req, res) => {

    const { key, message, data } = req.body

    const id = uuid()
    const created = Date.now()
    
    const log = { id, key, message, data, created }

    redis.zadd(`logger:log:${key}:${moment().format('DD/MM/YYYY')}:${id}`, created, JSON.stringify(log))
    
    return res.json({ id })
})

router.use((req, res, next) => {
    return res.json({ error: 404 })
})

module.exports = router
