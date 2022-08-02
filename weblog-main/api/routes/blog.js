const router = require("express").Router();
const con = require("./connection");


//create
router.post("/", (req,res)=>{

	var title = req.body.title; 
	var content = req.body.content;
	var type = req.body.type;
	var owner = req.body.user_id;
	var photo = req.body.photo || null;
	con.query('insert into Blog (blog_owner,blog_title,blog_type,blog_content,blog_date,photo)values(?,?,?,?,current_date(),?)',[owner,title,type,content,photo],(err)=>{
		if(err) res.status(500).json(err);
		else res.status(200).json("Blog created successfully");
	});

});


//update

router.put("/publish/:id", (req,res)=>{

	con.query("update Blog set publish='Yes' where blog_id = ?",[req.params.id],(err)=>{
		if(err) res.status(500).json(err);
		else res.ststus(200).json("Blog updated successfully");
	});
});

router.put("/:id", (req,res)=>{

	var title = req.body.title; 
	var content = req.body.content;
	var type = req.body.type;
	var photo = req.body.photo;
	con.query('update Blog set blog_title=?, blog_type=? ,blog_content=?,blog_date=current_date(), photo=? where blog_id = ?',[title,type,content,photo,req.params.id],(err)=>{
		if(err) res.status(500).json(err);
		else res.ststus(200).json("Blog updated successfully");
	});

});



//delete
router.delete("/:id", (req,res)=>{
	con.query("delete from Blog where blog_id=?", [req.params.id],(err,row)=>{
		if(err) res.status(500).json(err);
		else res.status(200).json("Blog has been deleted.");
	});	
	
});


//get

router.get("/myBlog/:id", (req,res)=>{

	var user = req.params.id;

		con.query("select * from Blog where blog_owner=?", [user],(err,row)=>{
			if(err) res.status(500).json(err);
			else res.status(200).json(row);
		});	
});

router.get("/:id", (req,res)=>{
	con.query("select * from Blog where blog_id=?", [req.params.id],(err,row)=>{
		if(err) res.status(500).json(err);
		else res.status(200).json(row[0]);
	});	
	
});




router.get("/", (req,res)=>{

	var user = req.query.user;
	var type = req.query.cat;

	if(user){
		con.query("select * from Blog where blog_owner=? and publish='Yes'", [user],(err,row)=>{
			if(err) res.status(500).json(err);
			else res.status(200).json(row);
			console.log(row);
		});	
	}
	else if(type){
		con.query("select * from Blog where blog_type=? and publish='Yes'", [type],(err,row)=>{
			if(err) res.status(500).json(err);
			else res.status(200).json(row);
		});		
	}
	else{
		con.query("select * from Blog where publish='Yes'",(err,row)=>{
			if(err) res.status(500).json(err);
			else res.status(200).json(row);
		});	

	}
	
	
});



module.exports = router;
