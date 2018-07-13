/**
 * Created by paranoia on 2017/12/17.
 */
var database = require('./dbConnection');

exports.getAllActivities = function (req, res) {
    var sql = 'SELECT * FROM activity WHERE deleted=0 ORDER BY id DESC';
    var param = [];
    var result1 = []; var i = 0;
    var state = [];
    database.query(sql, param, function (err, result) {
        if (err) {
            res.send({message: 20});
        } else {
            if (result.length === 0){
                res.send({message: 21});
            } else {
                result1 = result;
                var data = [];
                for (i = 0; i < result1.length; i++) {
                    var end = new Date(result[i].end_time + ' 00:00:00');
                    var date = new Date(getNowFormatDate());
                    if (date < end)
                        state.push('ongoing');
                    else
                        state.push('finished');
                    data.push({
                        id: result1[i].id,
                        name: result1[i].title,
                        start_time: result1[i].start_time,
                        end_time: result1[i].end_time,
                        state: state[i],
                        participant_num: result1[i].part_num,
                        description: result1[i].description
                    });
                }
            }
            res.send({
                message: 25,
                data: data
            });
        }
    });
};

exports.getActivitiesByPage = function (page, res) {
    var sql = 'SELECT count(*) AS \'total\' FROM activity ORDER BY id DESC';
    var param = [];
    var total = 0;
    database.query(sql, param, function (err, result) {
        if (err) {
            res.send({message: 20});
        } else {
            total = result[0].total;
            var sql = 'SELECT * FROM activity WHERE deleted=0 AND id>? AND id<? ORDER BY id DESC';
            var param = [total-page*10, total-(page-1)*10+1];
            console.log(result.total);
            var result1 = []; var i = 0;
            var state = [];
            database.query(sql, param, function (err, result) {
                if (err) {
                    res.send({message: 20});
                } else {
                    if (result.length === 0){
                        res.send({message: 21});
                    } else {
                        result1 = result;
                        var data = [];
                        for (i = 0; i < result1.length; i++) {
                            var end = new Date(result[i].end_time + ' 00:00:00');
                            var date = new Date(getNowFormatDate());
                            if (date < end)
                                state.push('ongoing');
                            else
                                state.push('finished');
                            data.push({
                                id: result1[i].id,
                                name: result1[i].title,
                                start_time: result1[i].start_time,
                                end_time: result1[i].end_time,
                                state: state[i],
                                participant_num: result1[i].part_num,
                                description: result1[i].description
                            });
                        }
                        res.send({
                            message: 25,
                            data: data
                        });
                    }
                }
            });
        }
    });
};

exports.getActivitiesPage = function (page, res) {
    var sql = 'SELECT count(*) AS \'total\' FROM activity ORDER BY id DESC';
    var param = [];
    var total = 0;
    database.query(sql, param, function (err, result) {
        if (err) {
            res.send({message: 20});
        } else {
            res.send({
                message: 25,
                total: result[0].total
            });
        }
    });
};

exports.getAllActivitiesNum = function (req, res) {
    var sql = 'SELECT count(*) AS \'total\' FROM activity WHERE deleted=0 ORDER BY id DESC';
    var param = [];
    database.query(sql, param, function (err, result) {
        if (err) {
            res.send({message: 20});
        } else {
            res.send({
                message: 25,
                num: result[0].total
            });
        }
    });
};

exports.addActivity = function (req, res) {
    var sql = 'INSERT INTO activity(user_id, title, start_time, end_time, description, deleted, part_num) VALUES(?,?,?,?,?,?,?)';
    var param = [req.body.userId, req.body.title, req.body.startTime, req.body.endTime, req.body.des, 0, 0];
    database.insert(sql, param, function (err, result) {
        if(err){
            console.log(err);
            res.send({message: 21});
        } else {
            res.send({message: 25});
        }
    });
};

exports.checkJoined = function (req, res) {
    var sql = 'SELECT * FROM participate WHERE user_id=? AND act_id=?';
    var param = [req.body.user_id, req.body.act_id];
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

exports.deleteActivity = function (id, res) {
    var sql = 'UPDATE activity SET deleted=1 WHERE id=?';
    var param = [id];
    database.insert(sql, param, function (err, result) {
        if(err){
            console.log(err);
            res.send({message: 20});
        } else {
            res.send({message: 25});
        }
    });
};

exports.getJoinedActivities = function (id, res) {
    var sql = 'SELECT * FROM (SELECT * FROM participate WHERE user_id = ?) AS "part_id" INNER JOIN activity WHERE part_id.act_id = activity.id AND activity.deleted=0 ORDER BY activity.id DESC;';
    var param = [id]; var state = [];
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
                    var end = new Date(result[i].end_time + ' 00:00:00');
                    var date = new Date(getNowFormatDate());
                    if (date < end)
                        state.push('ongoing');
                    else
                        state.push('finished');
                    data.push({
                        id: result[i].id,
                        name: result[i].title,
                        start_time: result[i].start_time,
                        end_time: result[i].end_time,
                        state: state[i],
                        participant_num: result[i].part_num,
                        description: result[i].description
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

exports.getLaunchedActivities = function (id, res) {
    var sql = 'SELECT * FROM  activity WHERE user_id=? AND deleted=0 ORDER BY id DESC;';
    var param = [id]; var state = [];
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
                    var end = new Date(result[i].end_time + ' 00:00:00');
                    var date = new Date(getNowFormatDate());
                    if (date < end)
                        state.push('ongoing');
                    else
                        state.push('finished');
                    data.push({
                        id: result[i].id,
                        name: result[i].title,
                        start_time: result[i].start_time,
                        end_time: result[i].end_time,
                        state: state[i],
                        participant_num: result[i].part_num,
                        description: result[i].description,
                        user_id: result[i].user_id
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

exports.joinActivity = function(req, res) {
    var sql = 'INSERT INTO participate(user_id, act_id) VALUES(?,?)';
    var param = [req.body.user_id, req.body.act_id];
    database.insert(sql, param, function (err, result) {
        if(err) {
            console.log(err);
            res.send({message: 21});
        } else {
            var sql = 'UPDATE activity SET part_num = part_num + 1 WHERE id = ?';
            var param = [req.body.act_id];
            database.insert(sql, param, function (err, result) {
                if (err) {
                    console.log(err);
                    res.send({message: 21});
                } else {
                    res.send({message: 25});
                }
            });
        }
    });
};

exports.quitActivity = function(req, res) {
    var sql = 'DELETE FROM participate WHERE user_id = ? AND act_id = ?;';
    var param = [req.body.user_id, req.body.act_id];
    database.insert(sql, param, function (err, result) {
        if(err) {
            console.log(err);
            res.send({message: 21});
        } else
            var sql = 'UPDATE activity SET part_num = part_num - 1 WHERE id = ?';
            var param = [req.body.act_id];
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

exports.editActivity = function (req, res) {
    var sql = 'UPDATE activity SET title=?, start_time=?, end_time=?, description=? WHERE id = ?;';
    var param = [req.body.title, req.body.start_time, req.body.end_time, req.body.des, req.body.act_id];
    database.insert(sql, param, function (err, result) {
        if(err) {
            console.log(err);
            res.send({message: 21});
        } else
            if (err) {
                console.log(err);
                res.send({message: 22});
            } else {
                res.send({message: 25});
            }
    });
};

exports.getActivityById = function (id, res) {
    var sql = 'SELECT * FROM activity WHERE id=?';
    var param = [id];
    database.query(sql, param, function (err, result) {
        if(err){
            console.log(err);
            res.send({message: 20});
        } else {
            if(result.length === 0)
                res.send({message: 21});
            else
                res.send({
                    message: 25,
                    data: result[0]
                });
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
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    return currentdate;
}