var mysql=require("mysql")

module.exports={
    config:{
        host:"localhost",
        user:"root",
        password:"l1234567",
        database:"b200602"
    },
    dbConn:function(sql,sqlObj,callBack){
        let pool=mysql.createPool(this.config)
        pool.getConnection((err,conn)=>{
            if(err){
                console.log(err)
                return;
            }
            conn.query(sql,sqlObj,callBack)
            conn.release();
            
        })
    }
}
