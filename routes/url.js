const express = require('express');
const validUrl = require('valid-url');
const shortid = require('shortid');
const Url = require('../models/url');
const config = require('config');

const urlRouter = express.Router();

//receive the url from the user
urlRouter.post('/trim', (req, res) => {
	const { longUrl } = req.body;
	const baseUrl = config.get('baseUrl');

	//check if the url is a valid url

	if (!validUrl.isUri(baseUrl)) {
		return res.status(400).json({
			message: 'The url you entered is invalid'
		});
	}

	//create the short code
	const urlCode = shortid.generate();

	//check for the long url
	if (validUrl.isUri(longUrl)) {
		Url.findOne({ longUrl })
			.then(url => {
				if (url) {
					return res.json(url);
				} else {
					shortUrl = baseUrl + '/' + urlCode;

					url = new Url({
						longUrl,
						shortUrl,
						urlCode,
						date: new Date()
					});
					url
						.save()
						.then(() => {
							res.json(url);
						})
						.catch(err => {
							res.status(500).json({
								Error: err.message
							});
						});
				}
			})
			.catch(err => {
				res.status(500).json({
					message: 'Server error.. Try again',
					Error: err.message
				});
			});
	} else {
		return res.status(501).json({
			message: 'Invalid Url'
		});
	}
});

module.exports = urlRouter;
