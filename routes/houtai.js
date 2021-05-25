let express = require('express');
let router = express.Router();
var db = require("../util/configDb.js");

// router.get('/',(req,res) => {
//     res.render('houtai');
// });


/**
 * 查询列表页
 */
router.get('/', function (req, res, next) {
    db.query('select * from tab_user', function (err, rows) {
        console.log(rows);
        if (err) {
            res.render('houtai', {title: 'nodeJsDemo', datas: []});
        } else {
            res.render('houtai', {title: 'nodeJsDemo', datas: rows});
        }
    })
});
/**
 * 删
 */
 router.get('/del/:id', function (req, res) {
    var id = req.params.id;
    db.query("delete from tab_user where id=" + id, function (err, rows) {
        if (err) {
            res.send("没删除掉："+err)
           // res.end('删除失败：' + err)
        } else {
            res.redirect('/houtai')
        }
    });
});
/**
 * 修改
 */
 router.get('/toUpdate/:id', function (req, res) {
    var id = req.params.id;
    db.query("select * from tab_user where id=" + id, function (err, rows) {
        if (err) {
            res.send("修改跳转失败"+err)
           // res.end('修改页面跳转失败：' + err);
        } else {
            res.render("update", {datas: rows});       //直接跳转
        }
    });
});
router.post('/update', function (req, res) {
    var id = req.body.id;
    var name = req.body.name;
    var account = req.body.account;
    var address = req.body.address;
    var money = req.body.money;
    db.query("update tab_user set name='" + name + "',account='" + account + "',dizhi='" + address + "',money='" + money + "' where id=" + id, function (err, rows) {
        if (err) {
            res.send("修改失败了哈哈哈："+err)
            //res.end('修改失败：' + err);
        } else {
            res.redirect('/houtai');
        }
    });
});
/**
 * 查询
 */
 router.post('/search', function (req, res) {
    var account = req.body.sname;
    var sql = "select * from tab_user";
    // if (account) {
        sql += " and account like '%" + account + "%' ";
    // }
    // if (age) {

        // sql += " and age=" + age + " ";
    // }

    sql = sql.replace("and","where");
    db.query(sql, function (err, rows) {
        if (err) {
            res.end("查询失败：", err)
        } else {
            res.render("houtai", {title: 'nodeJsDemo', datas: rows, sname: account});
        }
    });
});

/**
 * 用户总数
 */


module.exports = router;