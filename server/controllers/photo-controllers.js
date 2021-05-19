const { Photo, Comment, Tag } = require('../models');

module.exports = {
    async getPhotos(req, res) {
        const photoData = await Photo.find({});
        res.json(photoData);
    }, 
    async getPhoto(req, res) {
        const photoData = await Photo.findOne({ _id: req.body.id });

        if(!photoData) {
            return res.status(400).json({ message: 'No photo found at this id!' });
        }

        res.json(photoData);
    },
    async addPhoto(req, res) {
        const obj = {
            img: {
                data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                contentType: 'image/png'
            },
            title: req.body.title,
            description: req.body.description,
            alttext: req.body.alttext,
            price: req.body.price,
            tags: req.body.tags  
        }

        const photoData = await Photo.create(obj);

        if(!photoData) {
            return res.status(500).json({ message: 'Something went wrong!' });
        }

        res.json(photoData);
    }
}