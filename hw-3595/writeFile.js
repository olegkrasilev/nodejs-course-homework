const fs = require("node:fs/promises");

async function writeFile(filePath, content) {
  try {
    await fs.writeFile(filePath, content);
  } catch (err) {
    console.log(err);
  }
}

module.exports = writeFile;
