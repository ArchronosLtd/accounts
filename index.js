'use strict';
const express = require('express'),
	bodyParser = require('body-parser'),
	multer = require('multer'),
	upload = multer({
		dest: `./uploads/`,
		rename: function(fieldname, filename) {
			return filename;
		},
	});

let app = express();

app.use(bodyParser.json());

app.use(upload.single('receipt'));

app.listen(8080, () => {
	require('./src/controllers').init(app);
});