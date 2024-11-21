const fs = require("fs").promises;
const path = require("path");

async function getListDirectoryContents(dir) {
  let results = [];
  try {
    const list = await fs.readdir(dir, {
      encoding: "utf-8",
      withFileTypes: true,
    });
    for (const dirent of list) {
      const fullPath = path.join(dir, dirent.name);
      results.push(fullPath);
      if (dirent.isDirectory()) {
        results = results.filter((item) => item !== fullPath);
        const subResults = await getListDirectoryContents(fullPath);
        results = results.concat(subResults);
      }
    }
  } catch (error) {
    console.log("Такой папки не существует");
  }
  return results;
}

module.exports = { getListDirectoryContents };
