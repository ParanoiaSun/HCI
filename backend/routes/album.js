/**
 * Created by paranoia on 2017/12/17.
 */
var express = require('express');
var router = express.Router();
var albumService = require('../service/albumService');

router.get('/get/:id', function(req, res, next) {
    albumService.getAlbums(req, res);
});

router.post('/delete', function(req, res, next) {
    albumService.deleteAlbum(req.body.album_id, res);
});

router.post('/add', function(req, res, next) {
    albumService.addAlbum(req, res);
});

router.post('/add/tag', function(req, res, next) {
    albumService.addTag(req, res);
});

router.post('/delete/tag', function(req, res, next) {
    albumService.deleteTag(req, res);
});

router.post('/edit', function(req, res, next) {
    albumService.editAlbum(req, res);
});

module.exports = router;