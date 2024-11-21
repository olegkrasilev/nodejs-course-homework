const fs = require("fs/promises");

async function getFileModificationTime(filename) {
  try {
    const stats = await fs.stat(filename);
    return stats.mtime;
  } catch (error) {
    console.log("Нет такого файла");
    return null;
  }
}

module.exports = { getFileModificationTime };
