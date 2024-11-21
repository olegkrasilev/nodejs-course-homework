const fs = require("fs");
async function removeFile(input) {
  fs.unlink(input, (err) => {
    if (err) {
      console.error(`Error removing file: ${err}`);
      return;
    }
  });
}

module.exports = { removeFile };
