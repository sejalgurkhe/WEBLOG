const router = require("express").Router();
const con = require("./connection");
const bcrypt = require('bcrypt');

//resgiter
router.post("/register", (req,res)=>{
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;

	var hashPass = bcrypt.hashSync(password, 10);

	con.query("Select * from User where email=? or username=?", [email,username],(err,row)=>{
		if(err){
			console.log('abc');
			res.status(500).json(err);	
		} 
		if(row.length==0){
			con.query("Insert into User (email,username,password) values(?,?,?)",[email,username,hashPass],(er)=>{
				if(er){
					console.log(er);
					res.status(500).json(err);	
				}

				res.status(200).json(req.body);
			});
		}else{
			res.status(400).json("User already exist.");
		}
	});
	
});

//login
router.post("/login", (req,res)=>{
	var username = req.body.username;
	var password = req.body.password;

	con.query("Select * from User where username=?", [username],(err,row)=>{
		if(err) res.status(500).json(err);
		if(row.length==0){
			res.status(400).json("User does not exist.");
		}else{
			if(bcrypt.compareSync(password,row[0].password)){
				res.status(200).json(row[0]);
			}else{
				res.status(400).json("Password does not match.");
			}
		}
	});
	
});


module.exports = router;
