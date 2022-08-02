var mysql = require('mysql');

const con = mysql.createConnection({
	host: 'localhost',
	user: 'PKG',
	password: 'Pritam@2001',
	database: 'Weblog'
});


module.exports = con;