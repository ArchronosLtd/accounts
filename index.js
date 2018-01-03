'use strict';
const express = require('express'),
	bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.json());

app.listen(8080, () => {
	require('./src/controllers').init(app);
});