/**
 * Created by paranoia on 2017/12/17.
 */
var database = require('./dbConnection');
var fs = require('fs');
var formidable = require('formidable');
var multipart = require('multiparty');
var AVATAR_UPLOAD_FOLDER = '/photos/';
var domain = 'http://localhost:3000';

exports.uploadPhoto = function(req, res) {
    var extName = '';  //后缀名
    switch (req.files.file.type) {
        case 'image/pjpeg':
            extName = 'jpg';
            break;
        case 'image/jpeg':
            extName = 'jpg';
            break;
        case 'image/png':
            extName = 'png';
            break;
        case 'image/x-png':
            extName = 'png';
            break;
    }
    console.log(req.files.file);
    var avatarName = idGenerator() + '.' + extName;
    var newPath = 'public/images/' + avatarName;
    var showUrl = domain + '/download/' + avatarName;
    fs.renameSync(req.files.file.path, newPath);  //重命名
    var date = getNowFormatDate();
    var sql = 'INSERT INTO work(user_id, url, tag, album_id, upload_time, deleted) VALUES(?,?,?,?,?,?)';
    var param = [req.body.user_id, showUrl, '', req.body.album_id, date, 0];
    database.insert(sql, param, function (err, result) {
        if(err){
            console.log(err);
            res.send({message: 20});
        } else {
            res.send({message: 25, url: showUrl});
        }
    });
};

exports.getPhotos = function(req, res) {
    var sql = 'SELECT * FROM work WHERE album_id = ? AND deleted=0 ORDER BY ID ASC';
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
                        img_url: result[i].url,
                        img_id: result[i].id,
                        tag: result[i].tag,
                        userId: result[i].user_id,
                        album_id: result[i].album_id
                    });
                }
                res.send({message: 25, data: data});
            }
        }
    });
};

exports.getPhotoById = function(req, res) {
    var sql = 'SELECT * FROM work WHERE id = ? AND deleted=0;';
    var param = [req.params.id];
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
                        img_url: result[0].url,
                        img_id: result[0].id,
                        tag: result[0].tag,
                        userId: result[0].user_id,
                        album_id: result[0].album_id
                    }
                });
            }
        }
    });
};

exports.deletePhotos = function (id, res) {
    var sql = 'UPDATE work SET deleted=1 WHERE id=?';
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

exports.addTag = function (req, res) {
    var sql = 'SELECT tag FROM work WHERE id=?';
    var param = [req.body.photo_id];
    database.query(sql, param, function (err, result) {
        if(err){
            console.log(err);
            res.send({message: 20});
        } else {
            if(result.length === 0) {
                res.send({message: 21});
            }else{
                var tag = '';
                if(result[0].tag === '')
                    tag = req.body.tag;
                else
                    tag = result[0].tag + ';' + req.body.tag;
                console.log(tag);
                sql = 'UPDATE work SET tag=? WHERE id=?';
                param = [tag, req.body.photo_id];
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
    var sql = 'SELECT tag FROM work WHERE id=?';
    var param = [req.body.photo_id];
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
                sql = 'UPDATE work SET tag=? WHERE id=?';
                param = [tag, req.body.photo_id];
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

exports.searchAllByTag = function (req, res) {
    var sql = 'SELECT * FROM work WHERE tag LIKE ? AND deleted=0';
    var param = [req.body.word];
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
                        img_url: result[i].url,
                        img_id: result[i].id,
                        tag: result[i].tag,
                        userId: result[i].user_id
                    });
                }
                res.send({message: 25, data: data});
            }
        }
    });
};

exports.searchByTag = function (req, res) {
    var sql = 'SELECT * FROM work WHERE tag LIKE ? AND deleted=0 AND user_id=?';
    var param = [req.body.word, req.body.user_id];
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
                        img_url: result[i].url,
                        img_id: result[i].id,
                        tag: result[i].tag,
                        userId: result[i].user_id
                    });
                }
                res.send({message: 25, data: data});
            }
        }
    });
};

exports.getMessageBlogByGroup = function (req, res) {
    var sql = '';
    var param = [];
    if(req.body.group === 'all'){
        sql = 'SELECT * FROM (SELECT * FROM follow WHERE follower_id=?) AS \'follow_user\' INNER JOIN work ON follow_user.follow_id = work.user_id ORDER BY id DESC';
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
                            upload_time: result[i].upload_time,
                            img: result[i].url,
                            tag: result[i].tag,
                            user_id: result[i].user_id
                        });
                    }
                    res.send({message: 25, data: data});
                }
            }
        });
    } else {
        sql = 'SELECT * FROM (SELECT * FROM follow WHERE follower_id=? AND group_name=?) AS \'follow_user\' INNER JOIN work ON follow_user.follow_id = work.user_id ORDER BY id DESC;';
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
                            upload_time: result[i].upload_time,
                            img: result[i].url,
                            tag: result[i].tag,
                            user_id: result[i].user_id
                        });
                    }
                    res.send({message: 25, data: data});
                }
            }
        });
    }
};

exports.savePhoto = function (req, res) {
    var extName = '';  //后缀名
    switch (req.files.file.type) {
        case 'image/pjpeg':
            extName = 'jpg';
            break;
        case 'image/jpeg':
            extName = 'jpg';
            break;
        case 'image/png':
            extName = 'png';
            break;
        case 'image/x-png':
            extName = 'png';
            break;
    }
    var avatarName = idGenerator() + '.' + extName;
    var newPath = 'public/images/' + avatarName;
    var showUrl = domain + '/download/' + avatarName;
    console.log("newPath", newPath);
    console.log(req.body.user_id);
    fs.renameSync(req.files.file.path, newPath);  //重命名
    var date = getNowFormatDate();
    var sql = 'UPDATE work SET url=? WHERE id=?';
    var param = [showUrl, req.body.id];
    database.insert(sql, param, function (err, result) {
        if(err){
            console.log(err);
            res.send({message: 20});
        } else {
            res.send({message: 25, url: showUrl});
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

function idGenerator () {
    var id = '';
    for(var i = 0; i < 10; i++) {
        id += Math.floor(Math.random()*10);
    }
    return id;
}

function base64_encode(file) {
    // read binary data
    var bitmap = file;
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

// function to create file from base64 encoded string
function base64_decode(base64str, file) {
    // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
    var bitmap = new Buffer(base64str, 'base64');
    // write buffer to file
    fs.writeFileSync(file, bitmap);
    console.log('******** File created from base64 encoded string ********');
}