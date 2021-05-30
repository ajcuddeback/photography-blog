const router = require('express').Router();

const { authMiddleware } = require('../../utils/auth');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const {
    addPhoto,
    getPhoto,
    getPhotos
} = require('../../controllers/photo-controllers');

router.route('/').get(getPhotos)
router.route('/:id').get(getPhoto);
router.route('/upload').post(authMiddleware, upload.single('file'), addPhoto);

module.exports = router;