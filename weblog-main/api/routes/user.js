const router = require("express").Router();
const con = require("./connection");
const bcrypt = require('bcrypt');

//update
router.put("/:id", (req,res)=>{

	if(req.body.user_id == req.params.id){

		con.query("Select * from User where username=?", [username],(err,row)=>{
			if(err) res.status(500).json(err);
			if(row.length==0){

				var username = req.body.username;
				var password = req.body.password;
				var name = req.body.name;
				var age = req.body.age;
				var gender = req.body.gender;

				var hashPass = bcrypt.hash(password);


				con.query("Update User set username=?, password=?, name=?, age=?, gender=? where user_id=?",[username,hashPass,name,age,gender],(er)=>{
					if(er) res.status(500).json(err);
					else{
						con.query("select * from User where user_id=?",[req.body.user_id],(e,row)=>{
							res.status(200).json(row[0]);
						});
					}
				});
			}else{
				res.status(500).json("Username already exist.");
			}
		});	
	}
});

//delete
router.delete("/:id", (req,res)=>{
	if(req.body.user_id == req.params.id){

		con.query("delete from User where user_id=?", [req.params.id],(err,row)=>{
			if(err) res.status(500).json(err);
			else res.status(200).json("User has been deleted.");
		});	
	}
	
});


//get user
router.get("/:id", (req,res)=>{

		con.query("select * from User where user_id=?", [req.params.id],(err,row)=>{
			if(err) res.status(500).json(err);
			else res.status(200).json(row[0]);
		});
	
});

module.exports = router;
