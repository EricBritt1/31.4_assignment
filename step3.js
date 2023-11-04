const fs = require('fs');
const process = require('process');
const axios = require('axios');

/** handle output: write to file if out given, else print */
// What handleOutput does is takes in two arguments one each inside the text and output parameters. The goal of this function is to either print the contents of the text file OR write the the "out" contents TO text file. Out is the path to write to.

function handleOutput(text, out) {
  if (out) {
    fs.writeFile(out, text, 'utf8', function(err) {
      if (err) {
        console.error(`Couldn't write ${out}: ${err}`);
        process.exit(1);
      }
    });
  } else {
    console.log(text);
  }
}


/** read file at path and print it out. */
// Either 

function cat(path, out) {
  fs.readFile(path, 'utf8', function(err, data) {
    if (err) {
      console.error(`Error reading ${path}: ${err}`);
      process.exit(1);
    } else {
        // Cat is meant to just read file so we won't pass an out in. So we just use path I guess.
      handleOutput(data, out);
    }
  });
}

/** read page at URL and print it out. */

async function webCat(url, out) {
  try {
    let resp = await axios.get(url);
    handleOutput(resp.data, out);
  } catch (err) {
    console.error(`Error fetching ${url}: ${err}`);
    process.exit(1);
  }
}

let path;
let out;

if (process.argv[2] === '--out') {
  out = process.argv[3];
  path = process.argv[4];
} else {
  path = process.argv[2];
}

if (path.slice(0, 4) === 'http') {
  webCat(path, out);
} else {
  cat(path, out);
}
   