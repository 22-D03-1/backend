import { Router } from "express"
import passport from "passport"
import * as controller from "../controllers/authController.js"

const router = Router()

router
    .post("/register", controller.register)
    .post("/login", controller.login)
    .get("/google", passport.authenticate('google', { scope:[ 'email' ] }))
    .get("/google/callback", passport.authenticate( 'google', {
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
    }))
    .get("/google/success", (req, res) => res.send("google sucess"))
    .get("/google/failure", (req, res) => res.send("google fail"))

export default router