/**
 * Created by paranoia on 2017/12/17.
 */
var express = require('express');
var router = express.Router();
var activityService = require('../service/activityService');

router.get('/getAll', function(req, res, next) {
    activityService.getAllActivities(req, res);
    // res.send({message: 20});
});

router.get('/getByPage/:page', function(req, res, next) {
    activityService.getActivitiesByPage(req.params.page, res);
});

router.get('/getByPage', function(req, res, next) {
    activityService.getActivitiesPage(req, res);
});

router.get('/get/:id', function(req, res, next) {
    activityService.getActivityById(req.params.id, res);
});

router.post('/add', function(req, res, next) {
    activityService.addActivity(req, res);
});

router.post('/joined', function(req, res, next) {
    activityService.checkJoined(req, res);
});

router.get('/joined/:id', function(req, res, next) {
    activityService.getJoinedActivities(req.params.id, res);
});

router.get('/launched/:id', function(req, res, next) {
    activityService.getLaunchedActivities(req.params.id, res);
});

router.post('/join', function(req, res, next) {
    activityService.joinActivity(req, res);
});

router.post('/quit', function(req, res, next) {
    activityService.quitActivity(req, res);
});

router.post('/edit', function(req, res, next) {
    activityService.editActivity(req, res);
});

router.get('/delete/:id', function(req, res, next) {
    activityService.deleteActivity(req.params.id, res);
});

router.get('/total', function(req, res, next) {
    activityService.getAllActivitiesNum(req, res);
});

module.exports = router;