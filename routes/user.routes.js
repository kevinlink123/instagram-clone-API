const express = require('express');
const router = express.Router();

const { authJwt } = require('../middleware');
const controller = require('../controllers/user.controller');

router.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.get('/api/all', controller.allAccess);

router.get('/api/user', [authJwt.verifyToken] ,controller.mainPage);

module.exports = router;