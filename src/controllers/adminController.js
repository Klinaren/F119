const Season = require('../models/seasonModel');
const Episode = require('../models/episodeModel');

exports.listSeasons = async (req, res) => { 
    try {
        const seasons = await Season.find(); 
        res.render('admin/seasons/list', { title: 'Manage Seasons', seasons });
    } catch (error) {
        res.status(500).render('pages/error', { title: 'Error', error });
    }
};

exports.newSeasonForm = (req, res) => {
    res.render('admin/seasons/form', {
        title: 'Add New Season',
        season: null,
        errors: []
    });
};

exports.createSeason = async (req, res) => {
    try {
        const newSeason = new Season(req.body);
        await newSeason.save(); 
        res.redirect('/admin/seasons');
    } catch (error) {
        res.render('admin/seasons/form', {
            title: 'Add New Season',
            season: req.body,
            errors: error.errors ? Object.values(error.errors).map(err => err.message) : [error.message]
        });
    }
};

exports.editSeasonForm = async (req, res) => {
    try {
        const season = await Season.findById(req.params.id);
        if (!season) return res.status(404).render('pages/404', { title: 'Not Found', url: req.url });
        res.render('admin/seasons/form', { title: 'Edit Season', season, errors: [] });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateSeason = async (req, res) => {
    try {
        await Season.findByIdAndUpdate(req.params.id, req.body, { runValidators: true });
        res.redirect('/admin/seasons');
    } catch (error) {
        const season = await Season.findById(req.params.id);
        res.render('admin/seasons/form', {
            title: 'Edit Season',
            season: { ...season.toObject(), ...req.body },
            errors: error.errors ? Object.values(error.errors).map(err => err.message) : [error.message]
        });
    }
};

exports.deleteSeason = async (req, res) => {
    try {
        await Season.findByIdAndDelete(req.params.id);
        res.redirect('/admin/seasons');
    } catch (error) {
        res.status(500).send("Error deleting season");
    }
};

exports.listEpisodes = async (req, res) => {
    try {
        const season = await Season.findOne({ seasonId: req.params.seasonId });
        const episodes = await Episode.find({ seasonId: req.params.seasonId });
        res.render('admin/episodes/list', { 
            title: `Manage Episodes - ${season ? season.title : 'Unknown'}`, 
            season, 
            episodes 
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.newEpisodeForm = async (req, res) => {
    const season = await Season.findOne({ seasonId: req.params.seasonId });
    res.render('admin/episodes/form', { title: 'Add New Episode', season, episode: null, errors: [] });
};

exports.createEpisode = async (req, res) => {
    try {
        const episodeData = { ...req.body, seasonId: req.params.seasonId };
        const newEpisode = new Episode(episodeData);
        await newEpisode.save();
        res.redirect(`/admin/seasons/${req.params.seasonId}/episodes`);
    } catch (error) {
        const season = await Season.findOne({ seasonId: req.params.seasonId });
        res.render('admin/episodes/form', {
            title: 'Add New Episode',
            season,
            episode: req.body,
            errors: error.errors ? Object.values(error.errors).map(err => err.message) : [error.message]
        });
    }
};

exports.editEpisodeForm = async (req, res) => {
    try {
        const episode = await Episode.findById(req.params.id);
        const season = await Season.findOne({ seasonId: req.params.seasonId });
        res.render('admin/episodes/form', { title: 'Edit Episode', season, episode, errors: [] });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateEpisode = async (req, res) => {
    try {
        await Episode.findByIdAndUpdate(req.params.id, req.body, { runValidators: true });
        res.redirect(`/admin/seasons/${req.params.seasonId}/episodes`);
    } catch (error) {
        const season = await Season.findOne({ seasonId: req.params.seasonId });
        res.render('admin/episodes/form', {
            title: 'Edit Episode',
            season,
            episode: req.body,
            errors: error.errors ? Object.values(error.errors).map(err => err.message) : [error.message]
        });
    }
};

exports.deleteEpisode = async (req, res) => {
    try {
        await Episode.findByIdAndDelete(req.params.id);
        res.redirect(`/admin/seasons/${req.params.seasonId}/episodes`);
    } catch (error) {
        res.status(500).send("Error deleting episode");
    }
};