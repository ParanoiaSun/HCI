/**
 * Created by paranoia on 2017/12/17.
 */
var express = require('express');
var router = express.Router();
var adminService = require('../service/adminService');

router.get('/user', function(req, res, next) {
    adminService.getAllUsers(req, res);
});

router.get('/user/:id', function(req, res, next) {
    adminService.getUserById(req.params.id, res);
});

router.get('/delete/:id', function(req, res, next) {
    adminService.deleteUserById(req.params.id, res);
});

router.post('/edit/:id', function(req, res, next) {
    adminService.editUserById(req, res);
});

module.exports = router;