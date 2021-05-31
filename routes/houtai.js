let express = require('express');
let router = express.Router();
var db = require("../util/configDb.js");


// 返回前台
router.get('/fanhui',function(req,res){
    res.render('index');
})
//客户增删改查
/**
 * 查询列表页
 */
router.get('/', function (req, res, next) {
    db.query('select * from tab_sp', function (err, rows) {
        console.log(rows);
        if (err) {
            res.render('houtai', {title: 'nodeJsDemo', datas: []});
        } else {
            res.render('houtai', {title: 'nodeJsDemo', datas: rows});
        }
    })
});
/**
 * 新增页面跳转
 */
router.post('/add', function (req, res) {
    var sp_name = req.body.sp_name;
    var sp_tp = req.body.sp_tp;
    var sp_ks = req.body.sp_ks;
    var sp_jg = req.body.sp_jg;
    db.query("insert into tab_sp (sp_name,sp_tp,sp_ks,sp_jg) values('" + sp_name + "','" + sp_tp + "','"+sp_ks+"'," + sp_jg + ")", function (err, rows) {
        if (err) {
            res.end('新增失败：' + err);
        } else {
            res.redirect('/houtai');
        }
    })
});
/**
 * 删
 */
router.get('/del/:sp_id', function (req, res) {
    var id = req.params.sp_id;
    db.query("delete from tab_sp where sp_id=" + id, function (err, rows) {
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
router.get('/toUpdate/:sp_id', function (req, res) {
    var id = req.params.sp_id;
    db.query("select * from tab_sp where sp_id=" + id, function (err, rows) {
        if (err) {
            res.send("修改跳转失败"+err)
           // res.end('修改页面跳转失败：' + err);
        } else {
            res.render("update", {datas: rows});       //直接跳转
        }
    });
});
router.post('/update', function (req, res) {
    var sp_id = req.body.sp_id;
    var sp_name = req.body.sp_name;
    var sp_tp = req.body.sp_tp;
    var sp_ks = req.body.sp_ks;
    var sp_jg = req.body.sp_jg;
    db.query("update tab_sp set sp_name='"+sp_name+"',sp_tp='"+sp_tp+"',sp_ks='"+sp_ks+"',sp_jg="+sp_jg+" where sp_id="+ sp_id, function (err, rows) {
        if (err) {
            res.send("修改失败："+err)
            console.log(sp_id);
            console.log(sp_name);
            console.log(sp_tp);
            console.log(sp_ks);
            console.log(sp_jg);
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
    
    var sql2 = "select * from tab_sp";
    sql2 += " and sp_name like '%" + account + "%' ";
    
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