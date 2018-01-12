const imageSvc = require('../services/image');

module.exports = {
	GET: (req, res) => {
		imageSvc.get(req.params.transactionId).then((img) => {
			res.contentType(img.contentType).send(img.data).end();
		});
	}
}