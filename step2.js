const fs = require('fs');
const axios = require('axios');

async function cat(path = process.argv[2]) {
	if (path.slice(0, 4) === 'http') {
		try {
			let resp = await axios.get(path);
		} catch (err) {
			console.log(`Error reading ${path}:\n   Error: ${err}`);
			process.exit(1);
		}
		console.log(resp);
		process.exit(0);
	} else {
		fs.readFile(path, 'utf8', function(err, data) {
			if (err) {
				console.log(`Error reading ${path}:\n   Error: ${err}`);
				process.exit(1);
			}
			console.log(data);
		});
	}
}
cat();
