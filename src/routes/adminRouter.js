const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/seasons', adminController.listSeasons);
router.get('/seasons/new', adminController.newSeasonForm);
router.post('/seasons', adminController.createSeason);
router.get('/seasons/:id/edit', adminController.editSeasonForm);
router.put('/seasons/:id', adminController.updateSeason);
router.delete('/seasons/:id', adminController.deleteSeason);

router.get('/seasons/:seasonId/episodes', adminController.listEpisodes);
router.get('/seasons/:seasonId/episodes/new', adminController.newEpisodeForm);
router.post('/seasons/:seasonId/episodes', adminController.createEpisode);
router.get('/seasons/:seasonId/episodes/:id/edit', adminController.editEpisodeForm);
router.put('/seasons/:seasonId/episodes/:id', adminController.updateEpisode);
router.delete('/seasons/:seasonId/episodes/:id', adminController.deleteEpisode);

module.exports = router;