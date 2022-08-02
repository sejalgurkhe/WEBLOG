const express = require('express');
const app = express();
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const blogRoute = require('./routes/blog');
const commentRoute = require('./routes/comment');
const multer = require('multer');
const path = require('path');

app.use(express.json())
app.use('/images', express.static(path.join(__dirname+'/images')));

const storage = multer.diskStorage({
	destination: (req,file,cb)=>{
		cb(null, "images");
	},
	filename: (req, file, cb)=>{
		cb(null, req.body.name);
	},
})

const upload = multer({storage: storage});

app.post('/api/upload', upload.single("file"), (req,res)=>{
	res.status(200).json("file has been uploaded");
});

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/blog', blogRoute);
app.use('/api/comment', commentRoute);

app.use('/', (req,res)=>{
	console.log("this is main url");
});


app.listen('5000', ()=>{
	console.log("Backend is running.");
});
