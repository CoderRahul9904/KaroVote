import express from 'express';
import passport from 'passport';
import { signup, login, oauthCallback } from '../controllers/authController';

const router = express.Router();


router.post('/signup', signup);
router.post('/login', login);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  oauthCallback
);

export default router;
