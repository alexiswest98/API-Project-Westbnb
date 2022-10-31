// backend/routes/api/users.js
const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a firstName.'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a lastName.'),
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// Sign up
router.post('/', validateSignup, async (req, res) => {
    const { firstName, lastName, email, password, username } = req.body;

    try{
      const user = await User.signup({ firstName, lastName, email, username, password });
  
      user.token = await setTokenCookie(res, user);
  
      let myobj = {
       id: user.id,
       firstName: user.firstName,
       lastName: user.lastName,
       email: user.email,
       username: user.username,
       token: ""
     }
  
      res.status(200);
      res.json(myobj);

    } catch(e) {
        e.errors.forEach(error => {
          if(error.type === 'unique violation'){
            if(error.path === 'email'){
              res.status(403);
              res.json({
                "message": "User already exists",
                "statusCode": 403,
                "errors": {
                  "email": "User with that email already exists"
                }
              })
            }
            if(error.path === 'username'){
              res.status(403);
              res.json({
                "message": "User already exists",
                "statusCode": 403,
                "errors": {
                  "username": "User with that username already exists"
                }
              })

            }
          }
          
        });
    }
  }
);


module.exports = router;
