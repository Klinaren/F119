const mongoose = require('mongoose');

const seasonSchema = new mongoose.Schema({
    seasonId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    releaseDate: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, max: 10 },
    status: { type: String, enum: ['completed', 'ongoing', 'upcoming'], default: 'completed' }
});

module.exports = mongoose.model('Season', seasonSchema);