const router = require('express').Router();

const { authMiddleware } = require('../../utils/auth');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const {
    addPhoto,
    getPhoto,
    getTags,
    getPhotoByTag,
    getFeaturedPhoto,
    getPhotos,
    deletePhoto,
    addComment,
    deleteComment, 
    addTag,
    deleteTag
} = require('../../controllers/photo-controllers');

router.route('/').get(getPhotos);

router.route('/tags').get(getTags);

router.route('/tags/:tags').get(getPhotoByTag);

router.route('/featured').get(getFeaturedPhoto);

router.route('/:id').get(getPhoto);

router.route('/upload').post(authMiddleware, upload.single('file'), addPhoto);

router.route('/comment/:id').put(addComment);

router.route('/comment/:id/:photoId').put(authMiddleware ,deleteComment);

router.route('/delete/:key').delete(authMiddleware, deletePhoto);

router.route('/tags').post(addTag);

router.route('/tags/:id').delete(deleteTag);

module.exports = router;