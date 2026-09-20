const express=require("express")
const {upload}=require("../Middleware/multer.middleware")
const { registeruser,
        sendOtpMail,
        verifyOtpMail,
        loginuser,
        logoutuser,
        RefreshAccesstoken,
        updatepassword, 
        updateAvatar,
        getcurrentuser,
        sendForgotpasswordmail,
        resetPasswordWithGrant,
        logoutfromalldevices
      } = require("../controller/auth.controller")

const { verifyOtp } = require("../services/redis.service")
const { jwtverify } = require("../Middleware/auth.middleware")
const passport=require("../config/passport")
const { Apiresponse} = require('../utils/Apiresponse.utils');
const { Apierror} = require('../utils/Apierror.utils');
const authorize=require("../Middleware/rbac.middleware")

const router=express.Router()

router.post("/send-otp",sendOtpMail)
router.post("/verify-otp",verifyOtpMail)
router.post("/register",upload.single("avatar"),registeruser)
router.post("/login",loginuser)
router.post("/logout",jwtverify, logoutuser)
router.post("/logoutfromalldevices",jwtverify, logoutfromalldevices)
router.post("/RefreshAccesstoken",jwtverify, RefreshAccesstoken)
router.post("/updatepassword",jwtverify, updatepassword)
router.post("/updateAvatar",jwtverify,upload.single("image"),updateAvatar)
router.post("/getcurrentuser",jwtverify, getcurrentuser)
router.post("/forgot-password/mail", sendForgotpasswordmail);
router.post("/forgot-password/reset", resetPasswordWithGrant);
router.get("/google",passport.authenticate
  ("google",{scope:["email","profile"]}))

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  (req, res, next) => {
    try {
      if (!req.user) {
        throw new Apierror(400, 'Google Authentication failed');
      }
      return res
        .status(200)
        .json(new Apiresponse(200, req.user, 'Google login successful'));
    } catch (error) {
      next(error);
    }
  }
);


module.exports=router