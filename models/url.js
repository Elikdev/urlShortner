const mongoose = require('mongoose');

const urlSchema = mongoose.Schema({
	longUrl: String,
	urlCode: String,
	shortUrl: String,
	date: {
		type: String,
		default: Date.now
	}
});

module.exports = mongoose.model('Url', urlSchema);
