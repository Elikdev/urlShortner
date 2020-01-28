const express = require('express');
const router = express.Router();
const Url = require('../models/url');

router.get('/:code', (req, res) => {
	Url.findOne({ urlCode: req.params.code })
		.then(url => {
			if (url) {
				return res.redirect(url.longUrl);
			} else {
				res.status(404).json({
					message: 'Url not found'
				});
			}
		})
		.catch(err => {
			res.status(500).json({
				message: 'There was a problem.. Try again later',
				error: err.message
			});
		});
});

module.exports = router;
