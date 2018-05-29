/**
 * Created by paranoia on 2017/12/17.
 */
var database = require('./dbConnection');

exports.getBlog = function (id, res) {
    var sql = 'SELECT * FROM twitter WHERE user_id = ? AND deleted=0 ORDER BY id DESC';
    var param = [id];
    database.query(sql, param, function (err, result) {
        if (err) {
            res.send({message: 20});
        } else {
            if (result.length === 0){
                res.send({message: 97});
            } else {
                var data = [];
                for(var i = 0; i < result.length; i++) {
                    data.push({
                        id: result[i].id,
                        description: result[i].description,
                        send_time: result[i].send_time,
                        img: result[i].img,
                        origin_id: result[i].origin_id,
                        user_id: result[i].user_id,
                        like_num: result[i].like_num
                    });
                }
                res.send({message: 25, data: data});
            }
        }
    });
};

exports.deleteBlog = function (id, res) {
    var sql = 'UPDATE twitter SET deleted=1 WHERE id=?;';
    var param = [parseInt(id)];
    console.log('!!!!!!'+id);
    database.insert(sql, param, function (err, result) {
        if (err) {
            res.send({message: 20});
        } else {
            res.send({message: 25});
        }
    });
};

exports.addBlog = function (req, res) {
    var date = getNowFormatDate();
    var sql = 'INSERT INTO twitter(user_id, origin_id, img, description, send_time, like_num, deleted) VALUES(?,?,?,?,?,?,?)';
    var param = [req.body.user_id, null, req.body.img, req.body.des, date, 0, 0];
    database.insert(sql, param, function (err, result) {
        if(err){
            console.log(err);
            res.send({message: err});
        } else {
            res.send({message: 25});
        }
    });
};

exports.getAll = function (req, res) {
    var sql = 'SELECT * FROM twitter WHERE deleted=0 ORDER BY id DESC';
    var param = [];
    database.query(sql, param, function (err, result) {
        if (err) {
            res.send({message: 20});
        } else {
            if (result.length === 0){
                res.send({message: 99, result: '???'});
            } else {
                var data = [];
                for(var i = 0; i < result.length; i++) {
                    data.push({
                        id: result[i].id,
                        description: result[i].description,
                        send_time: result[i].send_time,
                        img: result[i].img,
                        origin_id: result[i].origin_id,
                        user_id: result[i].user_id,
                        like_num: result[i].like_num
                    });
                }
                res.send({message: 25, data: data});
            }
        }
    });
};

exports.getHot = function (req, res) {
    var sql = 'SELECT * FROM twitter WHERE deleted=0 ORDER BY like_num DESC';
    var param = [];
    database.query(sql, param, function (err, result) {
        if (err) {
            res.send({message: 20});
        } else {
            if (result.length === 0){
                res.send({message: 98, result: '???'});
            } else {
                var data = [];
                for(var i = 0; i < result.length; i++) {
                    data.push({
                        id: result[i].id,
                        description: result[i].description,
                        send_time: result[i].send_time,
                        img: result[i].img,
                        origin_id: result[i].origin_id,
                        user_id: result[i].user_id,
                        like_num: result[i].like_num
                    });
                }
                res.send({message: 25, data: data});
            }
        }
    });
};

exports.likeBlog = function (req, res) {
    var sql = 'INSERT INTO like(user_id, twitter_id) VALUES(?,?)';
    var param = [req.body.user_id, req.body.twitter_id];
    database.insert(sql, param, function (err, result) {
        if(err){
            console.log(err);
            res.send({total: total,message: err});
        } else {
            sql = 'UPDATE twitter SET like_num=like_num+1 WHERE id=?';
            param = [req.body.twitter_id];
            database.insert(sql, param, function (err, result) {
                if(err){
                    console.log(err);
                    res.send({message: err});
                } else {
                    res.send({message: 25});
                }
            });
        }
    });
};

exports.hasLikeBlog = function (req, res) {
    var sql = 'SELECT * FROM like WHERE user_id=? AND twitter_id=?';
    var param = [req.body.user_id, req.body.twitter_id];
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

exports.cancelLikeBlog = function (req, res) {
    var sql = 'DELETE FROM like WHERE user_id = ? AND twitter_id = ?;';
    var param = [req.body.user_id, req.body.twitter_id];
    database.insert(sql, param, function (err, result) {
        if(err) {
            console.log(err);
            res.send({message: 21});
        } else
            var sql = 'UPDATE twitter SET like_num=like_num-1 WHERE id = ?';
        var param = [req.body.twitter_id];
        database.insert(sql, param, function (err, result) {
            if (err) {
                console.log(err);
                res.send({message: 21});
            } else {
                res.send({message: 25});
            }
        });
    });
};

exports.getFollowBlogByGroup = function (req, res) {
    var sql = '';
    var param = [];
    if(req.body.group === 'all'){
        sql = 'SELECT * FROM (SELECT * FROM follow WHERE follower_id=?) AS \'follow_user\' INNER JOIN twitter ON follow_user.follow_id = twitter.user_id ORDER BY id DESC';
        param = [req.body.user_id];
        database.query(sql, param, function (err, result) {
            if (err) {
                res.send({message: 20});
            } else {
                if (result.length === 0){
                    res.send({message: 97});
                } else {
                    var data = [];
                    for(var i = 0; i < result.length; i++) {
                        data.push({
                            id: result[i].id,
                            description: result[i].description,
                            send_time: result[i].send_time,
                            img: result[i].img,
                            origin_id: result[i].origin_id,
                            user_id: result[i].user_id,
                            like_num: result[i].like_num
                        });
                    }
                    res.send({message: 25, data: data});
                }
            }
        });
    } else {
        sql = 'SELECT * FROM (SELECT * FROM follow WHERE follower_id=? AND group_name=?) AS \'follow_user\' INNER JOIN twitter ON follow_user.follow_id = twitter.user_id ORDER BY id DESC;';
        param = [req.body.user_id, req.body.group];
        database.query(sql, param, function (err, result) {
            if (err) {
                res.send({message: 20});
            } else {
                if (result.length === 0) {
                    res.send({message: 97});
                } else {
                    var data = [];
                    for (var i = 0; i < result.length; i++) {
                        data.push({
                            id: result[i].id,
                            description: result[i].description,
                            send_time: result[i].send_time,
                            img: result[i].img,
                            origin_id: result[i].origin_id,
                            user_id: result[i].user_id,
                            like_num: result[i].like_num
                        });
                    }
                    res.send({message: 25, data: data});
                }
            }
        });
    }
};

exports.addReview = function (req, res) {
    var date = getNowFormatDate();
    var sql = 'INSERT INTO review(user_id, user_name, twitter_id, send_time, content, deleted) VALUES(?,?,?,?,?,?)';
    var param = [req.body.user_id, req.body.user_name, req.body.twitter_id, date, req.body.content, 0];
    database.insert(sql, param, function (err, result) {
        if(err){
            console.log(err);
            res.send({message: err});
        } else {
            res.send({message: 25});
        }
    });
};

exports.getReviews = function (id, res) {
    var sql = 'SELECT * FROM (SELECT * FROM review WHERE twitter_id=? AND deleted=0) AS \'reviews\' INNER JOIN user WHERE reviews.user_id=user.id ORDER BY reviews.id DESC';
    var param = [id];
    database.query(sql, param, function (err, result) {
        if (err) {
            res.send({message: 20});
        } else {
            if (result.length === 0){
                res.send({message: 97});
            } else {
                var data = [];
                for(var i = 0; i < result.length; i++) {
                    data.push({
                        id: result[i].id,
                        user_id: result[i].user_id,
                        user_name: result[i].username,
                        content: result[i].content
                    });
                }
                res.send({message: 25, data: data});
            }
        }
    });
};

exports.deleteReview = function (id, res) {
    var sql = 'UPDATE review SET deleted=1 WHERE id=?;';
    var param = [id];
    database.insert(sql, param, function (err, result) {
        if (err) {
            res.send({message: 20});
        } else {
            res.send({message: 25});
        }
    });
};

exports.repostBlog = function (req, res) {
    var sql = 'SELECT * FROM twitter WHERE id = ?;';
    var param = [req.body.twitter_id];
    var result1;
    database.query(sql, param, function (err, result) {
        if (err) {
            res.send({message: 20});
        } else {
            if (result.length === 0){
                res.send({message: 21});
            } else {
                result1 = result[0];
                var date = getNowFormatDate();
                console.log(result1);
                sql = 'INSERT INTO twitter(user_id, origin_id, img, description, send_time, like_num, deleted) VALUES(?,?,?,?,?,?,?)';
                param = [req.body.user_id, result1.user_id, result1.img, result1.description, date, 0, 0];
                database.insert(sql, param, function (err, result) {
                    if(err){
                        res.send({message: 22});
                    } else {
                        res.send({message: 25});
                    }
                });
            }
        }
    });
};

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    return currentdate;
}