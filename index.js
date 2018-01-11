'use strict';
const express = require('express'),
	bodyParser = require('body-parser'),
	multer = require('multer');

let app = express();

app.use(bodyParser.json());

app.use(multer({
	dest: `./uploads/`,
	rename: function(fieldname, filename) {
		return filename;
	},
}));

app.listen(8080, () => {
	require('./src/controllers').init(app);
});