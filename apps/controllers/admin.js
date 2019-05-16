var express = require('express');

var router = express.Router();

router.get("/admin",(req,res)=>{
    var {content} = req.query;
    // var query = "UPDATE chapters SET content ='"+content+"' WHERE id=";

    var query="select * from chapters where manga ='"+content+"'";
    
    db.query(query,(err,result)=>{
        if(!err){
            res.send({data:result});
        }else{
            res.send(err);
        }
    })
})

module.exports = router;