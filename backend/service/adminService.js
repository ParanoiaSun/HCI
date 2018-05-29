/**
 * Created by paranoia on 2017/12/17.
 */
var database = require('./dbConnection');

exports.getAllUsers = function (req, res) {
    var sql = 'SELECT * FROM user WHERE deleted=0';
    var param = [];
    database.query(sql, param, function (err, result) {
        if (err) {
            res.send({message: 20});
        } else {
            if (result.length === 0){
                res.send({message: 21});
            } else {
                var data = [];
                for(var i = 0; i < result.length; i++) {
                    data.push({
                        username: result[i].username,
                        user_id: result[i].id,
                        avatar: result[i].avatar
                    });
                }
                res.send({message: 25, data: data});
            }
        }
    });
};

exports.getUserById = function (id, res) {
    var sql = 'SELECT * FROM user WHERE id=? AND deleted=0';
    var param = [id];
    database.query(sql, param, function (err, result) {
        if (err) {
            res.send({message: 20});
        } else {
            if (result.length === 0){
                res.send({message: 21});
            } else {
                res.send({
                    message: 25,
                    data: {
                        username: result[0].username,
                        user_id: result[0].id,
                        avatar: result[0].avatar,
                        email: result[0].email
                    }
                });
            }
        }
    });
};

exports.deleteUserById = function (id, res) {
    var sql = 'UPDATE user SET deleted = 1 WHERE ID = ?';
    var param = [id];
    database.insert(sql, param, function (err, result) {
        if(err){
            console.log(err);
            res.send({message: 20});
        }else {
            res.send({message: 25});
        }
    });
};

exports.editUserById = function (req, res) {
    var sql = 'UPDATE user SET username = ? WHERE id = ?';
    var param = [req.body.username, req.params.id];
    database.insert(sql, param, function (err, result) {
        if(err){
            console.log(err);
            res.send({message: 20});
        }else {
            sql = 'UPDATE user SET email = ? WHERE id = ?';
            param = [req.body.email, req.params.id];
            database.insert(sql, param, function (err, result) {
                if(err){
                    console.log(err);
                    res.send({message: 20});
                }else {
                    res.send({message: 25});
                }
            });
        }
    });
};