import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import { Strategy } from 'passport-google-oauth2'

import { googleCallback } from "../controllers/authController.js";

passport.use(new Strategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4001/auth/google/callback",
    passReqToCallback   : true
  }, googleCallback
));

passport.serializeUser((user,done)=>{
  done(null,user.id)
})

passport.deserializeUser((user,done)=>{
  done(null,user)
})