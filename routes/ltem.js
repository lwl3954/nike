let express = require('express');
let router = express.Router();
var db = require("../util/configDb.js");

// router.get('/',(req,res) => {
//     res.render('ltem');
// });
router.get('/', function (req, res, next) {
    db.query('select * from tab_sp', function (err, rows) {
        console.log(rows);
        if (err) {
            res.render('ltem', {title: 'nodeJsDemo', datas: []});
        } else {
            res.render('ltem', {title: 'nodeJsDemo', datas: rows});
        }
    })
});

module.exports = router;