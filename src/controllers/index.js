'use strict';

module.exports = {
    init: (app) => {
        app.get('/', (req, res) => {
            res.send('Accounts sytstem').status(200).end();
        });
    }
}
