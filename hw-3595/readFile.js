const fs = require("node:fs/promises");

async function readFile(filePath) {
  try {
    const data = await fs.readFile(filePath, { encoding: "utf8" });
    return JSON.parse(data);
  } catch (err) {
    console.log(err);
  }
}

module.exports = readFile;
