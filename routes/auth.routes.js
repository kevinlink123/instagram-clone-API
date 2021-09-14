const express = require('express');
const router = express.Router();

const { verifySignUp } = require("../middleware");
const controller = require('../controllers/auth.controller');

router.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.post('/api/auth/signup', [verifySignUp.checkDuplicateUsername], controller.signup);

router.post('/api/auth/signin', controller.signin);

router.delete('/api/auth/user', controller.deleteUser);

module.exports = router;