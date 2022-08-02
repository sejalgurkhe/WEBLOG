const router = require("express").Router();
const con = require("./connection");


//create
router.post("/", (req,res)=>{

	var description = req.body.description;
	var blog = req.body.blog_id;
	var user = req.body.user_id;

	con.query('insert into Comment (comment_user_id,comment_blog_id,comment_description,comment_date)values(?,?,?,now())',[user,blog,description],(err)=>{
		if(err) res.status(500).json(err);
		else res.ststus(200).json("Comment added successfully");
	});

});


//delete
router.delete("/:id", (req,res)=>{
	con.query("delete from Comment where comment_id=?", [req.params.id],(err,row)=>{
		if(err) res.status(500).json(err);
		else res.status(200).json("comment has been deleted.");
	});	
	
});


//get
router.get("/:blogId", (req,res)=>{
	con.query("select * from Comment where blog_id=?", [req.params.blogId],(err,row)=>{
		if(err) res.status(500).json(err);
		else res.status(200).json(row);
	});	
	
});


module.exports = router;
