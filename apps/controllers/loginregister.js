var express = require('express');
var router = express.Router();
var md5 = require('md5');

router.get('/login',(req,res)=>{
    var {username,password} = req.query;

    var query = "SELECT * FROM member where username='"+username+"' and password ='"+md5(password)+"'";

    db.query(query,(error,result)=>{
        
        if(!error){
            if(result.length>0){
                res.json({"status":1,"message":"Đăng nhập thành công","token":result[0].token})
            }else{
                res.json({"status":0,"message":"Đăng nhập thất bại"})
            };
        }

    })
})

router.get('/register',(req,res)=>{
    var {username,password,email} = req.query;

    
    var query = "SELECT * FROM member where username='"+username+"' or email='"+email+"'";
    db.query(query,(err,result)=>{
        if(!err){
            if(result.length >=1){
                if(result[0].username == username){
                    res.send({"status":0,"message":"username đã tồn tại"});
                }else if(result[0].email == email){
                    res.send({"status":3,"message":"email đã tồn tại"});
                }
            }else{
                var insert = "INSERT INTO member(username,password,email,token,ugroup) VALUES ('"+username+"','"+md5(password)+"','"+email+"','"+md5(username)+"', 0)";
                console.log(password);
                db.query(insert);
                res.send({"status":1,"message":"Đăng ký thành công"});
            }
        }else{
            res.send(err);
            res.send({"status":2,"message":"lỗi server"});

        }
    })
})

router.get('/changepass',(req,res)=>{
    var {username,token,oldpass,newpass,renewpass} = req.query;

    var query = "select * from member where username='"+username+"' and token='"+token+"' and password ='"+md5(oldpass)+"'";
    db.query(query,(err,result)=>{
        if(!err){
            if(renewpass == newpass){
                if(result.length >=1){
                    var updatePass = "update member set password='"+md5(newpass)+"' where username='"+username+"' and token='"+token+"'";
                    db.query(updatePass);
                    res.json({"status":0,"message":"Thay đổi mật khẩu thành công"})
                }else{
                    res.json({"status":1,"message":"Không tồn tại username này"})

                }
            }else{
                res.json({"status":2,"message":"Mật khẩu không trùng khớp"})

            }
        }else{
            console.log(err)
        }
    })
})

router.get("/admin/login",(req,res) =>{
    var {username,password} = req.query;

    var query = "SELECT * FROM member where username='"+username+"' & password='"+password+"'";
    db.query(query,(err,result)=>{
        
        if(!err){
            if(result.length>=1){
                if(result[0].ugroup ==1){
                    res.json({"status":10,"message":"Chào quản trị viên"});
                }else{
                    res.json({"status:":1,"message":"Bạn không phải quản trị viên đi chỗ khác chơi"})
                }
            }
        }else{
            res.json(err);
            console.log(err);
        }
    })
})
module.exports = router;