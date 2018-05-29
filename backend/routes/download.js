var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/:id', function(req, res, next) {
    //第二种方式
    var path = 'public/images/' + req.params.id;
    var f = fs.createReadStream(path);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.writeHead(200, {
        'Content-Type': 'application/force-download',
        'Content-Disposition': 'attachment; filename=' + req.params.id
    });
    f.pipe(res);
});

module.exports = router;