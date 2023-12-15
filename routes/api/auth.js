const express = require("express");

const ctrl = require('../../controllers/auth')

const { validateBody, authenticate } = require('../../middlewares')

const {schemas} = require('../../models/user')

const router = express.Router();

router.post('/signup', validateBody(schemas.registerSchema), ctrl.signup)

router.post('/signin', validateBody(schemas.loginSchema), ctrl.signin)

router.post("/forgot-password", ctrl.forgotPassword)

router.post("/signout", authenticate, ctrl.signout)

module.exports = router