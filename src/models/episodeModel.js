const mongoose = require('mongoose');

const episodeSchema = new mongoose.Schema({
    seasonId: { type: String, required: true },
    episodeNumber: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true }
});

module.exports = mongoose.model('Episode', episodeSchema);