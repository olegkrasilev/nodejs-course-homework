const { getListDirectoryContents } = require("./get-List-Directory-Contents");
const { gzip } = require("./gzip");

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question("Введите путь к папке ", async (foldername) => {
  const files = await getListDirectoryContents(foldername);
  for (const file of files) {
    await gzip(file, files);
  }
  readline.close();
});
