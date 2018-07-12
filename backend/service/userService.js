/**
 * Created by paranoia on 2017/12/16.
 */
var database = require('./dbConnection');

exports.login = function (id, password, res, callback) {
    var sql = 'SELECT * FROM user WHERE id = ? AND password = ?';
    var param = [id, password];
    database.query(sql, param, function (err, result) {
        if (err) {
            callback(err, result, 22);
        } else {
            if (result.length === 0){
                callback(err, result, 21);
            } else {
                res.send({
                    message: 25
                });
            }
        }
    });
};

exports.register = function (username, password, res) {
    var userId = idGenerator();
    var sql_user = 'INSERT INTO user(id, username, password, avatar, email, deleted) VALUES(?,?,?,?,?,?)';
    var param_user = [userId, username, password,
        'http://localhost:3000/download/7076829422.jpg',
    null, 0];
    database.insert(sql_user, param_user, function (err, result) {
        if(err){
            res.send({message: 21});
        }else{
            var sql_user = 'INSERT INTO follow_group(user_id, name) VALUES(?,?)';
            var param_user = [userId, 'default'];
            database.insert(sql_user, param_user, function (err, result) {
                if(err){
                    res.send({message: 22});
                }else{
                    res.send({
                        message: 25,
                        id: userId
                    });
                }
            });
        }
    });
};

exports.getProfile = function (id, res) {
    var sql = 'SELECT * FROM user WHERE id = ?';
    var param = [id];
    var result1 = {}; var result2 = 0; var result3 = 0;
    var result4 = 0;
    database.query(sql, param, function (err, result) {
        if (err) {
            // callback(err, result, 20); //数据库出错
            res.send({
                message: 20
            });
        } else {
            if (result.length === 0){
                // callback(err, result, 21); //数据库出错
                res.send({
                    message: 21
                });
            } else {
                result1 = result[0];
                sql = 'SELECT COUNT(*) AS "sum" FROM FOLLOW WHERE FOLLOW_ID=?;';
                param = [id];
                database.query(sql, param, function (err, result) {
                    result2 = result[0].sum;
                    sql = 'SELECT COUNT(*) AS "sum" FROM FOLLOW WHERE FOLLOWER_ID=?;';
                    param = [id];
                    database.query(sql, param, function (err, result) {
                        result3 = result[0].sum;
                        sql = 'SELECT COUNT(*) AS "sum" FROM FOLLOW WHERE FOLLOW_ID=?;';
                        param = [id];
                        database.query(sql, param, function (err, result) {
                            result2 = result[0].sum;
                            sql = 'SELECT COUNT(*) AS "sum" FROM TWITTER WHERE USER_ID=? AND DELETED=0;';
                            param = [id];
                            database.query(sql, param, function (err, result) {
                                result4 = result[0].sum;
                                res.send({
                                    message: 25,
                                    profile: {
                                        username: result1.username,
                                        user_id: result1.id,
                                        avatar: result1.avatar,
                                        email: result1.email,
                                        follow_num: result3,
                                        follower_num: result2,
                                        twitter_num: result4,
                                        deleted: result1.deleted
                                    }
                                });
                            });
                        });
                    });
                });
            }
        }
    });
};

exports.getFollow = function (id, res) {
    var sql = 'SELECT * FROM (SELECT * FROM follow WHERE follower_id=?) AS "fo" INNER JOIN user WHERE fo.follow_id = user.id AND user.deleted=0;';
    var param = [id];
    database.query(sql, param, function (err, result) {
        if(err){
            console.log(err);
            res.send({message: 20});
        } else {
            if(result.length === 0)
                res.send({message: 21});
            else {
                var data = [];
                for (var i = 0; i < result.length; i++) {
                    data.push({
                        user_id: result[i].follow_id,
                        user_name: result[i].username,
                        avatar: result[i].avatar
                    });
                }
                res.send({
                    message: 25,
                    data: data
                });
            }
        }
    });
};

exports.getFollower = function (id, res) {
    var sql = 'SELECT * FROM (SELECT * FROM follow WHERE follow_id=?) AS "fo" INNER JOIN user WHERE fo.follower_id = user.id AND user.deleted=0;';
    var param = [id];
    database.query(sql, param, function (err, result) {
        if(err){
            console.log(err);
            res.send({message: 20});
        } else {
            if(result.length === 0)
                res.send({message: 21});
            else {
                var data = [];
                for (var i = 0; i < result.length; i++) {
                    data.push({
                        user_id: result[i].follower_id,
                        user_name: result[i].username,
                        avatar: result[i].avatar
                    });
                }
                res.send({
                    message: 25,
                    data: data
                });
            }
        }
    });
};

exports.checkFollow = function (req, res) {
    var sql = 'SELECT * FROM follow WHERE follow_id=? AND follower_id=?';
    var param = [req.body.follow_id, req.body.follower_id];
    database.query(sql, param, function (err, result) {
        if(err){
            console.log(err);
            res.send({message: 20});
        } else {
            if(result.length === 0)
                res.send({message: 21});
            else
                res.send({message: 25});
        }
    });
};

exports.follow = function (req, res) {
    var sql = 'INSERT INTO follow(follow_id, follower_id, group_name) VALUES(?,?,?)';
    var param = [req.body.follow_id, req.body.follower_id, 'default'];
    database.insert(sql, param, function (err, result) {
        if(err) {
            console.log(err);
            res.send({message: 21});
        } else {
            res.send({message: 25})
        }
    });
};

exports.unFollow = function(req, res) {
    var sql = 'DELETE FROM follow WHERE follow_id = ? AND follower_id = ?;';
    var param = [req.body.follow_id, req.body.follower_id];
    database.insert(sql, param, function (err, result) {
        if(err) {
            console.log(err);
            res.send({message: 21});
        } else
            res.send({message: 25});
    });
};

exports.getGroup = function(id, res) {
    var sql = 'SELECT * FROM follow_group WHERE user_id=?';
    var param = [id];
    database.query(sql, param, function (err, result) {
        if(err){
            console.log(err);
            res.send({message: 20});
        } else {
            if(result.length === 0)
                res.send({message: 21});
            else {
                var data = [];
                for (var i = 0; i < result.length; i++) {
                    data.push({
                        user_id: result[i].user_id,
                        name: result[i].name,
                        id: result[i].id
                    });
                }
                res.send({
                    message: 25,
                    data: data
                });
            }
        }
    });
};

exports.addGroup = function(req, res) {
    var sql = 'INSERT INTO follow_group(user_id, name) VALUES(?,?)';
    var param = [req.body.user_id, req.body.group_name];
    database.insert(sql, param, function (err, result) {
        if(err) {
            console.log(err);
            res.send({message: 21});
        } else {
            res.send({message: 25});
        }
    });
};

exports.deleteGroup = function(req, res) {
    var sql = 'DELETE FROM follow_group WHERE user_id = ? AND name = ?;';
    var param = [req.body.user_id, req.body.group_name];
    database.insert(sql, param, function (err, result) {
        if(err) {
            console.log(err);
            res.send({message: 21});
        } else {
            sql = 'UPDATE follow SET group_name=\'default\' WHERE follower_id=? AND group_name=?';
            param = [req.body.user_id, req.body.group_name];
            database.insert(sql, param, function (err, result) {
                if (err) {
                    res.send({message: 20});
                } else {
                    res.send({message: 25});
                }
            });
        }

    });
};

exports.editGroup = function(req, res) {
    var sql = 'UPDATE follow_group SET name=? WHERE user_id = ? AND name = ?;';
    var param = [req.body.edit_name, req.body.user_id, req.body.group_name];
    database.insert(sql, param, function (err, result) {
        if(err) {
            console.log(err);
            res.send({message: 21});
        } else {
            sql = 'UPDATE follow SET group_name=? WHERE follower_id=? AND group_name=?';
            param = [req.body.edit_name, req.body.user_id, req.body.group_name];
            database.insert(sql, param, function (err, result) {
                if (err) {
                    res.send({message: 20});
                } else {
                    res.send({message: 25});
                }
            });
        }

    });
};

exports.followEditGroup = function(req, res) {
    var sql = 'UPDATE follow SET group_name=? WHERE follower_id=? and follow_id=?;';
    var param = [req.body.group_name, req.body.user_id, req.body.follow_id];
    database.insert(sql, param, function (err, result) {
        if (err) {
            res.send({message: 20});
        } else {
            res.send({message: 25});
        }
    });
};

exports.getFollowGroup = function(req, res) {
    var sql = 'SELECT group_name FROM follow WHERE follow_id=? AND follower_id=?';
    var param = [req.body.follow_id, req.body.follower_id];
    database.query(sql, param, function (err, result) {
        if(err){
            console.log(err);
            res.send({message: 20});
        } else {
            if(result.length === 0)
                res.send({message: 21});
            else {
                res.send({
                    message: 25,
                    data: result[0].group_name
                });
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


function idGenerator () {
    var id = '';
    for(var i = 0; i < 8; i++) {
        id += Math.floor(Math.random()*10);
    }
    return id;
}

function checkIdValidation (id) {
    var sql = 'SELECT * FROM user WHERE ID = ?';
    var param = [id];
    database.query(sql, param, function (err, result) {
        if (err) {
            console.log(1)
        } else {
            console.log(2)
        }
    })
}