'use strict';
const express = require('express');

let app = express();

app.listen(8080, () => {
    require('./src/controllers').init(app);
});
