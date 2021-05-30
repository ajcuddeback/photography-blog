const router = require('express').Router();

const { authMiddleware } = require('../../utils/auth');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const {
    addPhoto
} = require('../../controllers/photo-controllers');

router.route('/upload').post(upload.single('file'), addPhoto);

module.exports = router;