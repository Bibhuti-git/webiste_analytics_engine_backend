const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const APIKey = require('../models/apiKey');
require('dotenv').config();

passport.use(
    newGoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback',
        },

        async (accessToken, refreshToken, profile, done) => {
            try {
                let existingUser = await APIKey.findOne({website:profile.emails[0].value});

                if (!existingUser) {
                   
                    existingUser =new APIKey({website:profile.emails[0].value});
                    await existingUser.save();
                }
                return done(null, existingUser);
            } catch (error) {
                
                return done(error, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await APIKey.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
        
    }
});