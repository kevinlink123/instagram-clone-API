const express = require('express');
const router = express.Router();

const { authJwt } = require('../middleware');

const userController = require('../controllers/user.controller');

router.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.get('/api/all', userController.allAccess);

router.post('/api/like', [authJwt.verifyToken], userController.postLike);

module.exports = router;