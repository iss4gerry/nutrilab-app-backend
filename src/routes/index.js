const express = require('express')
const foodRouter = require('./food-route')
const authRouter = require('./auth-route')
const profileRoute = require('./profile-route')
const historyRoute = require('./history-route')

const router = express.Router()

const defaultRoutes = [
    {
        path: '/food',
        route: foodRouter
    },
    {
        path: '/auth',
        route: authRouter
    },
    {
        path: '/profile',
        route: profileRoute
    },
    {
        path: '/history',
        route: historyRoute
    }
]

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

module.exports = router