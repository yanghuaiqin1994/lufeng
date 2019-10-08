const express=require('express');
const mysql=require('mysql');
const server=express();
server.listen(80);
server.use(express.static("public"));

    var pool = mysql.createPool({
        host: "127.0.0.1",
        user: "root",
        password: "",
        database: "lusy"
    });



server.get('/city',(req,res)=>{
    var sql="select * from city  ";
    pool.query(sql,(err,result)=>{
        if (err) throw err
		res.send(result)       }
    )

});

server.get('/area',(req,res)=>{
    var cid=req.query.cid;
    var sql="select * from area where cid=?";
    console.log(cid)
    pool.query(sql,[cid],(err,result)=>{
        if(err) throw err
        res.send(result)
    })
});

server.get('/maa',(req,res)=>{
    var cx=req.query.cx;
    var name=req.query.name;
    var tel=req.query.tel;
    var cid=req.query.city;
    var sex=req.query.sex;
    console.log("车型"+cx,"姓名"+name,"电话"+tel,"城市"+cid,"性别"+sex)
    var sql="insert into maa values(null,?,?,?,?,?)"
    pool.query(sql,[cx,name,tel,cid,sex],(err,result)=>{

        if(result.affectedrows==0){
            res.send("注册失败")
        }else{
            res.send("注册成功")
        }
    })
})

