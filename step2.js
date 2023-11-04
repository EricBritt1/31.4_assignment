const fs = require('fs');
const process = require('process')
const axios = require('axios');


function cat(path) {
fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading ${path}: ${err}`);
        process.kill(1);
    } else {
        console.log(data)
    }
})
}

async function webCat(url) {
try {
let resp = await axios.get(url);
console.log(resp.data)
} catch (err) {
    console.error(`Error fetching ${url}: ${err}`)
    process.exit(1)
}
}

let path_input = process.argv[2]
if (path_input.slice(0,4) === 'http') {
    webCat(process.argv[2])
} else {
    cat(process.argv[2])
}


webCat(process.argv[2])
