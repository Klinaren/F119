const Season = require('../models/seasonModel');

exports.index = async (req, res) => {
    try {
        const { status, minRating, search, sortBy, order } = req.query;
        
        const filters = { status, minRating, search, sortBy: sortBy || 'releaseDate', order: order || 'desc' };
        
        let query = {};
        
        if (status) query.status = status;
        
        if (minRating) query.rating = { $gte: parseFloat(minRating) };
        
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        let sortOptions = {};
        sortOptions[filters.sortBy] = filters.order === 'asc' ? 1 : -1;

        const seasons = await Season.find(query).sort(sortOptions);

        res.render('pages/index', {
            title: 'The Walking Dead: The Telltale Definitive Series',
            seasons,
            filters
        });
    } catch (error) {
        console.error('Error in index:', error);
        res.status(500).render('pages/error', {
            title: 'Error',
            error: { message: error.message }
        });
    }
};

exports.show = async (req, res) => {
    try {
        const season = await Season.findOne({ seasonId: req.params.id });

        if (!season) {
            return res.status(404).render('pages/404', {
                title: '404 - Season Not Found',
                url: req.url
            });
        }

        const Episode = require('../models/episodeModel');
        const episodes = await Episode.find({ seasonId: req.params.id }).sort({ episodeNumber: 1 });

        res.render('pages/seasonDetails', {
            title: season.title,
            season,
            episodes
        });
    } catch (error) {
        console.error('Error in show:', error);
        res.status(500).render('pages/error', {
            title: 'Error',
            error: { message: error.message }
        });
    }
};