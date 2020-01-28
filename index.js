const express = require('express');
const app = express();
const dbConnect = require('./config/db');
const router = require('./routes/index');
const urlRouter = require('./routes/url');

//connect to database
dbConnect();

app.use(express.json({ extended: false }));

//create our routes
app.use('/', router);
app.use('/api/v1/url', urlRouter);

const PORT = 4000;

app.listen(PORT, () => {
	console.log(`UrlShortner running on ${PORT}`);
});
