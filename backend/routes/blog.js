/**
 * Created by paranoia on 2017/12/17.
 */
var express = require('express');
var router = express.Router();
var blogService = require('../service/blogService');

router.post('/', function(req, res, next) {
    blogService.getBlog(req.body.id, res);
});

router.post('/repost', function(req, res, next) {
    blogService.repostBlog(req, res);
});


router.get('/all', function(req, res, next) {
    blogService.getAll(req, res);
});

router.get('/hot', function(req, res, next) {
    blogService.getHot(req, res);
});

router.get('/delete/:id', function(req, res, next) {
    blogService.deleteBlog(req.params.id, res);
});

router.post('/add', function(req, res, next) {
    blogService.addBlog(req, res);
});

router.post('/like', function(req, res, next) {
    blogService.likeBlog(req, res);
});

router.post('/hasLike', function(req, res, next) {
    blogService.hasLikeBlog(req, res);
});

router.post('/cancelLike', function(req, res, next) {
    blogService.cancelLikeBlog(req, res);
});

router.post('/follow/group', function(req, res, next) {
    blogService.getFollowBlogByGroup(req, res);
});

router.post('/review/add', function(req, res, next) {
    blogService.addReview(req, res);
});

router.post('/review/', function(req, res, next) {
    blogService.getReviews(req.body.twitter_id, res);
});

router.post('/review/delete', function(req, res, next) {
    blogService.deleteReview(req.body.twitter_id, res);
});

module.exports = router;