var express = require('express');
var router = express.Router();

router.get("/getallmanga",require(__dirname+"/manga"));
router.get("/getchapter",require(__dirname+"/manga"));
router.get("/getchapterimage",require(__dirname+"/manga"));
router.get("/searchManga",require(__dirname+"/manga"));

router.get("/admin",require(__dirname+"/admin"));
router.get("/login",require(__dirname+"/loginregister"));
router.get("/admin/login",require(__dirname+"/loginregister"));
router.get("/register",require(__dirname+"/loginregister"));
router.get("/changepass",require(__dirname+"/loginregister"));

router.get("/",(req,res)=>{
    res.render("home");
});

router.get("/chappter",(req,res)=>{
    var manga = req.query.manga;
    var query = `select * from chapters where manga ='`+manga+"'";
    
    db.query(query,(err,result)=>{
        if(!err){
            console.log(result);
            res.json(result);
        }
    })
})


module.exports = router;