/**
 * Created by paranoia on 2017/12/17.
 */
var express = require('express');
var router = express.Router();
var photoService = require('../service/photoService');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

router.post('/upload', multipartMiddleware, function(req, res, next) {
    photoService.uploadPhoto(req, res);
});

router.get('/:id',function(req, res, next) {
    photoService.getPhotos(req, res);
});

router.get('/get/:id',function(req, res, next) {
    photoService.getPhotoById(req, res);
});

router.get('/delete/:id',function(req, res, next) {
    photoService.deletePhotos(req.params.id, res);
});

router.post('/add/tag', function(req, res, next) {
    photoService.addTag(req, res);
});

router.post('/delete/tag', function(req, res, next) {
    photoService.deleteTag(req, res);
});

router.post('/searchAll', function(req, res, next) {
    photoService.searchAllByTag(req, res);
});

router.post('/search', function(req, res, next) {
    photoService.searchByTag(req, res);
});

router.post('/message/group', function(req, res, next) {
    photoService.getMessageBlogByGroup(req, res);
});

router.post('/save', multipartMiddleware, function(req, res, next) {
    photoService.savePhoto(req, res);
});

module.exports = router;