const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const PORT = 8181;

if (!fs.existsSync('./temp')) fs.mkdirSync('./temp');

fs.readdir(__dirname + '/temp', (err, files) => {
	if (err) console.error(err);
	files.forEach(f => {
		fs.unlink(__dirname + '/temp/' + f, err => {
			if (err) console.error(err);
		});
	});
});

const app = express();

app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

app.listen(PORT, () => { console.log(`Server started on port ${PORT}`) });