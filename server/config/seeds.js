const db = require('./connection');
const { Tag } = require('../models');

db.once('open', async () => {
    await Tag.insertMany([
        { tagName: 'Woods' },
        { tagName: 'Water' },
        { tagName: 'People' },
        { tagName: 'Sunset' }
    ])

    console.log('Tags Seeded')
})