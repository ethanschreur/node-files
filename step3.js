const fs = require('fs');
const axios = require('axios');

function write(path, data) {
	console.log(data);
	fs.writeFile(process.argv[3], data, 'utf8', function(err) {
		if (err) {
			console.log(`Couln\'t write ${path}:\n  Error: ${err}`);
		}
	});
}

async function getHTML(path) {
	try {
		let ret = await axios.get(path);
		process.argv[2] === '--out' ? write(path, String(ret.data)) : log(ret.data);
	} catch (err) {
		console.log(`Error reading ${path}:\n   Error: ${err}`);
		process.exit(1);
	}
}

function getFile(path) {
	fs.readFile(path, 'utf8', function(err, data) {
		try {
			if (err) {
				console.log(`Error reading ${path}:\n   Error: ${err}`);
				process.exit(1);
			}
			process.argv[2] === '--out' ? write(path, data) : log(data);
		} catch (e) {
			console.log(e);
		}
	});
}

function log(it) {
	console.log(it);
}

async function cat() {
	let path = process.argv[2] === '--out' ? process.argv[4] : process.argv[2];
	if (path.slice(0, 4) === 'http') {
		getHTML(path);
	} else {
		getFile(path);
	}
}

cat();
