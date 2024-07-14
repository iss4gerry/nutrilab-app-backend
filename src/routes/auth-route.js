const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth-controller')
const validate = require('../middlewares/validate')
const authValidation = require('../validations/auth-validation')

router.route('/register').post(validate(authValidation.register), authController.register)
router.route('/login').post(validate(authValidation.login), authController.login)

module.exports = router

/**
 * @swagger
 * components:
 *   schemas:
 *     Register:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: The name of user
 *         email:
 *           type: string
 *           description: The email of user
 *         password:
 *           type: string
 *           description: The password of user
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The email of user
 *         password:
 *           type: string
 *           description: The password of user
 *     
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The Auth managing API
 * /register:
 *   post:
 *     summary: Create a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Register'
*     responses:
 *       '200':
 *         description: User Created
 *         content:
 *           application/json:
 *             example:
 *               userCreated:
 *                 {
 *                     "status": 200,
 *                     "message": "Success",
 *                     "data": {
 *                        "id": "5fb3aa47-f976-4781-9c95-a6e65e8d9194",
 *                        "name": "gerry",
 *                        "email": "gerry@gmail.com",
 *                        "password": "$2a$09$MAqkojYm7L7ogBvuBtKgV.s7s5wfZ1DOZPb1S17SUTEPpVamp99IK",
 *                        "role": "user",
 *                        "createdAt": "2024-07-07T03:44:31.783Z",
 *                        "updatedAt": "2024-07-07T03:44:31.783Z",
 *                        "isEmailVerified": false
 *                      }
 *                      }
 *       '400':
 *         description: Email already taken
 *         content:
 *           application/json:
 *             example:
 *               code: 400
 *               message: "Email already taken"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               code: 500
 *               message: "Internal server error"
 * /login:
 *   post:
 *     summary: Login from existing user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       '200':
 *         description: User Login
 *         content:
 *           application/json:
 *             example:
 *               user:
 *                 {
 *                   "status": 200,
 *                   "message": "Success",
 *                   "data": {
 *                       "id": "5fb3aa47-f976-4781-9c95-a6e65e8d9194",
 *                       "name": "gerry",
 *                       "email": "gerry@gmail.com",
 *                       "password": "$2a$09$MAqkojYm7L7ogBvuBtKgV.s7s5wfZ1DOZPb1S17SUTEPpVamp99IK",
 *                       "role": "user",
 *                       "createdAt": "2024-07-07T03:44:31.783Z",
 *                       "updatedAt": "2024-07-07T03:44:31.783Z",
 *                       "isEmailVerified": false
 *                   }
 *                   }
 *             schema:
 *                $ref: '#/components/schemas/Login'
 *       '401':
 *         description: Incorrect email or password
 *         content:
 *           application/json:
 *             example:
 *               {
 *                   "status": 401,
 *                   "message": "Incorrect email or password"
 *                }
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               {
 *                   "status": 500,
 *                   "message": "Internal Server Error"
 *                }
 */