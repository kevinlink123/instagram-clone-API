const express = require('express');
const router = express.Router();

const Multer = require('multer');

const multer = Multer({
    storage: Multer.MemoryStorage,
    fileSize: 5 * 1024 * 1024,
  });

const { authJwt } = require('../middleware');

const fileController = require('../controllers/file.controller');

router.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.get('/api/image/all', [authJwt.verifyToken], fileController.getAllImages)

router.post('/api/image', [authJwt.verifyToken, multer.single('image')], fileController.uploadImage);

router.delete('/api/image', [authJwt.verifyToken], fileController.deleteImage);

module.exports = router;