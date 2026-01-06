const mongoose = require('mongoose');

const seasonSchema = new mongoose.Schema({
    seasonId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    releaseDate: { type: String, required: true },
    rating: { type: Number, required: true },
    status: { type: String, required: true }
});

module.exports = mongoose.model('Season', seasonSchema);