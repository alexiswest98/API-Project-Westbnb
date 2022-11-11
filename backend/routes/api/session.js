// backend/routes/api/session.js
const express = require('express');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateLogin = [
    check('credential')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Please provide a valid email or username.'),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a password.'),
    handleValidationErrors
  ];


// Log in
router.post('/', validateLogin, async (req, res, next) => {
      const { credential, password } = req.body;
  
      let user = await User.login({ credential, password });
  
      if (!user) {
        res.status(401);
        res.json({
          "message": "Invalid credentials",
          "statusCode": 401
        })
      };

      user.token = await setTokenCookie(res, user);


     let myobj = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      token: ""
    }

      return res.json(myobj);
    }
  );

// Log out
router.delete('/', (_req, res) => {
        res.clearCookie('token');
        return res.json({ message: 'success' });
    }
);

router.get('/', (req, res) => {
        const { user } = req;
        if (user) {
            return res.json(user.toSafeObject());
        } else return res.json(null);
    }
);


module.exports = router;
