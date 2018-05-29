/**
 * Created by paranoia on 2017/12/17.
 */
var database = require('./dbConnection');

exports.getAlbums = function (req, res) {
    var sql = 'SELECT * FROM ALBUM WHERE user_id = ? AND deleted=0 ORDER BY id DESC';
    var param = [req.params.id];
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
                        album_name: result[i].name,
                        album_id: result[i].id,
                        tag: result[i].tag,
                        userId: result[i].user_id
                    });
                }
                res.send({message: 25, data: data});
            }
        }
    });
};

exports.deleteAlbum = function (id, res) {
    var sql = 'UPDATE album SET deleted=1 WHERE ID = ?;';
    var param = [id];
    database.insert(sql, param, function (err, result) {
        if (err) {
            res.send({message: 20});
        } else {
            res.send({message: 25});
        }
    });
};

exports.editAlbum = function (req, res) {
    var sql = 'UPDATE album SET name=? WHERE ID = ?;';
    var param = [req.body.name, req.body.album_id];
    database.insert(sql, param, function (err, result) {
        if (err) {
            res.send({message: 20});
        } else {
            res.send({message: 25});
        }
    });
};

exports.addAlbum = function (req, res) {
    sql = 'INSERT INTO album(user_id, name, tag, deleted) VALUES(?,?,?,?)';
    param = [req.body.userId, req.body.name, req.body.name, 0];
    database.insert(sql, param, function (err, result) {
        if(err){
            console.log(err);
            res.send({message: 21});
        } else {
            res.send({message: 25});
        }
    });
};


exports.addTag = function (req, res) {
    var sql = 'SELECT tag FROM ALBUM WHERE id=?';
    var param = [req.body.album_id];
    database.query(sql, param, function (err, result) {
        if(err){
            console.log(err);
            res.send({message: 20});
        } else {
            if(result.length === 0) {
                res.send({message: 21});
            }else{
                var tag = result[0].tag + ';' + req.body.tag;
                console.log(tag);
                sql = 'UPDATE album SET tag=? WHERE id=?';
                param = [tag, req.body.album_id];
                database.insert(sql, param, function (err, result) {
                    if(err){
                        console.log(err);
                        res.send({message: 22});
                    } else {
                        res.send({message: 25});
                    }
                });
            }
        }
    });
};

exports.deleteTag = function (req, res) {
    var sql = 'SELECT tag FROM ALBUM WHERE id=?';
    var param = [req.body.album_id];
    database.query(sql, param, function (err, result) {
        if(err){
            console.log(err);
            res.send({message: 20});
        } else {
            if(result.length === 0) {
                res.send({message: 21});
            }else{
                const tags = result[0].tag.split(';');
                var tags_new = []; var tag = '';
                for(var i = 0; i < tags.length; i++) {
                    if(req.body.tag !== tags[i])
                        tags_new.push(tags[i]);
                }
                for(var i = 0; i < tags_new.length; i++) {
                    if(i < tags_new.length - 1)
                        tag += tags_new[i] + ';';
                    else
                        tag += tags_new[i];
                }
                sql = 'UPDATE album SET tag=? WHERE id=?';
                param = [tag, req.body.album_id];
                database.insert(sql, param, function (err, result) {
                    if(err){
                        console.log(err);
                        res.send({message: 22});
                    } else {
                        res.send({message: 25});
                    }
                });
            }
        }
    });
};