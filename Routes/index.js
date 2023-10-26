const {Router} = require('express');
const router = Router();
const AuthController = require('../Controllers');
router.get('', AuthController.info);
router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);
module.exports = router;