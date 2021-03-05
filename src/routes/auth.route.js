const { Router } = require('express');
const router = Router();

const Auth = require('../controllers/auth.controller');
const auth = new Auth();


router
    .route('/signin')
    .post(auth.signIn);

router 
    .route('/signup')
    .post(auth.signUp);

module.exports = router;