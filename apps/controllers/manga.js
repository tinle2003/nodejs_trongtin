var express = require('express');

var router = express.Router();

router.get("/getallmanga",(req,res)=>{

    var query = "select id,name,slug,authors,genres,description,cover,last_chapter from mangas";

    db.query(query,(err,result)=>{
        if(!err){
            res.send({data:result});
        }else{
            res.json(err);
        }

    })
});

router.get("/getChapter",(req,res)=>{
    var {manga} = req.query;

    var query = "select id,chapter,manga from chapters where manga ='"+manga+"' ORDER BY chapter ASC";
    db.query(query,(err,result)=>{
        if(!err){
            res.send({data:result});
        }else{
            res.send(err);
        }
    })
});

router.get("/getChapterImage",(req,res)=>{
    var {idChapter} = req.query;

    var query = "select * from chapters where id ='"+idChapter+"'";
    db.query(query,(err,result)=>{
        if(!err){
            res.send({data:result});
        }else{
            res.send(err);
        }
    })
})

router.get("/searchManga",(req,res)=>{
    var {keySearch} = req.query;

    var query = "select id,name,slug,authors,genres,description,cover,last_chapter from mangas where name LIKE '"+keySearch+"%'";

    db.query(query,(err,result)=>{
        if(!err){
            if(result.length>=1){
                res.send({data:result});
            }else{
                res.send({data:[{"name":"Không tìm thấy"}]})
            }
        }else{
            res.send(err);
        }
    })
})
module.exports = router;