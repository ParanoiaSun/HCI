/**
 * Created by paranoia on 2017/12/17.
 */
var mysql = require('mysql');
var sqlite3 = require('sqlite3');

/**
 *
 * @param sql 查询sql语句, 必选
 * @param param 可选
 * @param callback 必选
 */

exports.query = function (sql, param, callback) {
    callback = callback||param;
    var sqlite3Connect = new sqlite3.Database('./database/photowall.db');
    sqlite3Connect.all(sql, param, function(err, result){
        callback(err,result);
        sqlite3Connect.close();
    });
};

exports.insert = function(sql, param, callback) {
    callback = callback||param;
    var sqlite3Connect = new sqlite3.Database('./database/photowall.db');
    sqlite3Connect.run(sql, param, function(err){
        callback(err,this);
        sqlite3Connect.close();
    });
};

exports.multiInsert = function(sql, params, callback) {
    var sqlite3Connect = new sqlite3.Database('./database/photowall.db');
    sqlite3Connect.run('BEGIN TRANSACTION');
    for(var i = 0; i < params.length; i += 1) {
        sqlite3Connect.run(sql, params[i]);
    }
    sqlite3Connect.run('END TRANSACTION', function(err) {
        if(err) {
            console.log(err);
            callback(21);
        } else {
            callback(20);
        }
    });
    sqlite3Connect.close();
};
exports.checkToken = function (token, callback) {
    var sql = '' +
        'SELECT l.userId, u.nickName FROM login l join users u on l.userId=u.userId WHERE token=?';
    var param = [token];
    var sqlite3Connect = new sqlite3.Database('./database/photowall.db');
    sqlite3Connect.all(sql, param, function(err, result){
        callback(err,result);
        sqlite3Connect.close();
    });
};

// var sql = 'SELECT photos.photoUrl, users.nickName as author FROM photos JOIN users ON photos.userId=users.userId';
// var k = function(err, result) {
//     console.log(err);
//     console.log(result);
// };
// sqlite3Connect.all(sql, k);
// query('select * from users where userId=?',[59],function(err,result){
//     console.log(result);
// });