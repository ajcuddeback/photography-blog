const db = require('./connection');
const { Tag } = require('../models');

db.once('open', async () => {
    await Tag.insertMany([
        { tagName: 'Featured' },
        { tagName: 'Free to use' },
        { tagName: 'Nature' },
        { tagName: 'Water' },
        { tagName: 'Beach' },
        { tagName: 'Out in the woods' },
        { tagName: 'Flowers' }
    ])

    console.log('Tags Seeded')
})