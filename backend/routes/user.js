var express = require('express');
var router = express.Router();
var userService = require('../service/userService');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res, next) {
    var userId = req.body.userId;
    var password = req.body.password;
    if(undefined !== userId && undefined !== password) {
        userService.login(userId, password, res, function (err, result) {
            if (err || result.length === 0) {
                console.log(err);
                res.send({
                    message: 21
                });
            } else {
                res.send({
                    message: 20,
                    data: result[0]
                })
            }
        });
    } else {
        res.send({message: 23});
    }
});

router.post('/register', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    userService.register(username, password, res);

});

router.get('/register', function(req, res, next) {
    // userService.login(req, res);
});

router.post('/profile', function(req, res, next) {
    var userId = req.body.userId;
    userService.getProfile(userId, res);
});

router.get('/follow/:id', function(req, res, next) {
    userService.getFollow(req.params.id, res);
});

router.get('/follower/:id', function(req, res, next) {
    userService.getFollower(req.params.id, res);
});

router.post('/check_follow', function(req, res, next) {
    userService.checkFollow(req, res);
});

router.post('/follow', function(req, res, next) {
    userService.follow(req, res);
});

router.post('/unFollow', function(req, res, next) {
    userService.unFollow(req, res);
});

router.post('/follow/groupEdit', function(req, res, next) {
    userService.followEditGroup(req, res);
});

router.post('/follow/group', function(req, res, next) {
    userService.getFollowGroup(req, res);
});

router.get('/group/:id', function(req, res, next) {
    userService.getGroup(req.params.id, res);
});

router.post('/groupAdd', function(req, res, next) {
    userService.addGroup(req, res);
});

router.post('/groupDelete', function(req, res, next) {
    userService.deleteGroup(req, res);
});

router.post('/groupEdit', function(req, res, next) {
    userService.editGroup(req, res);
});

module.exports = router;
