const passport = require('passport');
const { Apierror } = require('../utils/Apierror.utils');

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const {User}=require("../Model/user.model")

passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:"http://localhost:3000/auth/google/callback",
    scope: ['profile', 'email']
  },
async(accessToken, refreshToken, profile, cb)=> {
    try{
        let user=await User.findOne({
            $or:[{ googleId:profile.id },{email:profile.emails[0].value}]
        })
   if (user) {
          if (!user.googleId) {
            user.googleId = profile.id;
            if (!user.avatar) user.avatar =profile.photos?.[0]?.value
            await user.save();
          }
        } else {
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails?.[0]?.value,
            avatar: profile.photos?.[0]?.value,
            role: 'user',
            Verified: true
          });
        }
     return cb(null, user)
    }catch(error){
       return cb(error,null)
    }
    
  }
));
module.exports=passport