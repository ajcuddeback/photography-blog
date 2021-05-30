const router = require('express').Router();

const { authMiddleware } = require('../../utils/auth');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const {
    addPhoto,
    getPhoto,
    getTags,
    getPhotos
} = require('../../controllers/photo-controllers');

router.route('/').get(getPhotos);

router.route('/tags').get(getTags);

router.route('/:id').get(getPhoto);

router.route('/upload').post(authMiddleware, upload.single('file'), addPhoto);

module.exports = router;