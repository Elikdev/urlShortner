const config = require('config');
const mongodbUrl = config.get('MONGODBURL');
const mongoose = require('mongoose');

const dbConnect = () => {
	mongoose
		.connect(mongodbUrl, { useNewUrlParser: true })
		.then(() => {
			console.log('Successfully connected to the datbase');
		})
		.catch(err => {
			console.error(err.message);
		});
};
module.exports = dbConnect;
