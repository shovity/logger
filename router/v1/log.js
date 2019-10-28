'use strict'

const express = require('express')
const uuid = require('uuid/v4')
const moment = require('moment')

const logService = require('../../services/logService')

const api = express.Router()


api.get('/', (req, res) => {
    return res.json({ a: uuid(), b: moment().format('DD/MM/YYYY')})
})

api.post('/', (req, res) => {

    const { namespace, key, action, message, user, data } = req.body

    if (!namespace || !key || !action || !message) {
        return res.json({ error: { message: 'missing param: namespace || key || action || message' } })
    }

    const id = uuid()
    const created = Date.now()
    
    logService.push({ namespace, key, action, message, user, data, created, id })

    return res.json({ id })
})

module.exports = api
