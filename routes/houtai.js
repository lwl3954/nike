let express = require('express');
let router = express.Router();
var db = require("../util/configDb.js");

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
    var phone = req.body.phone;
    var money = req.body.money;
    db.query("update tab_user set name='" + name + "',account='" + account + "',phone='" + phone + "',money='" + money + "' where id=" + id, function (err, rows) {
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
    // var sql = "select * from tab_user";
    //     sql += " and account like '%" + account + "%' ";

    // var sql1 = "select * from tab_user";
    //     sql1 += " and phone like '%" + account + "%' ";

    var sql2 = "select * from tab_user";
        sql2 += " and name like '%" + account + "%' ";

    // sql = sql.replace("and","where");
    // sql1 = sql1.replace("and","where");
    sql2 = sql2.replace("and","where");

    db.query((sql2), function (err, rows) {
        if (err) {
            res.end("查询失败：", err)
        } else {
            res.render("houtai", {title: 'nodeJsDemo', datas: rows, sname: account});
        }
    });
});



module.exports = router;