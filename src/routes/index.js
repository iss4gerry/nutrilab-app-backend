const express = require('express')
const foodRouter = require('./food-route')
const authRouter = require('./auth-route')

const router = express.Router()

const defaultRoutes = [
    {
        path: '/food',
        route: foodRouter
    },
    {
        path: '/auth',
        route: authRouter
    }
]

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

module.exports = router