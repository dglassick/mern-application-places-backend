const express = require('express');
const { check } = require('express-validator');

const userControllers = require('../controllers/users-controller');

const router = express.Router();

router.get('/', userControllers.getUsers);

router.post(
  '/signup',
  [
    check('name').not().isEmpty(),
    check('email').normalizeEmail({ gmail_remove_dots: false }).isEmail(),
    check('password').isLength({ min: 6 })
  ],
  userControllers.signup
);

router.post(
  '/login',
  [check('email').isEmail(), check('password').isLength({ min: 6 })],
  userControllers.login
);

module.exports = router;
