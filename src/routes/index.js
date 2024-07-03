const express = require('express')
const foodRouter = require('./food-route')

const router = express.Router()

const defaultRoutes = [
    {
        path: '/food',
        route: foodRouter
    }
]

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

module.exports = router