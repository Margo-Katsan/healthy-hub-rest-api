const express = require("express");

const ctrl = require('../../controllers/auth')

const { validateBody, authenticate } = require('../../middlewares')

const {userSchemas} = require('../../models/user')

const router = express.Router();

router.post('/signup', validateBody(userSchemas.registerSchema), ctrl.signup)

router.post('/signin', validateBody(userSchemas.loginSchema), ctrl.signin)

router.post("/forgot-password", ctrl.forgotPassword)

router.post("/signout", authenticate, ctrl.signout)

module.exports = router