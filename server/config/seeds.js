const db = require('./connection');
const { Tag } = require('../models');

db.once('open', async () => {
    await Tag.insertMany([
        { tagName: 'Featured' },
        { tagName: 'Free to use' },
        { tagName: 'For Sale' }
    ])

    console.log('Tags Seeded')
})