const { getListDirectoryContents } = require("./get-List-Directory-Contents");
const { gzip } = require("./gzip");

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error("Ошибка: укажите путь к папке.");
  process.exit(1);
}

const foldername = args[0];

(async () => {
  try {
    const files = await getListDirectoryContents(foldername);
    for (const file of files) {
      await gzip(file, files);
    }
  } catch (error) {
    console.error("Произошла ошибка:", error.message);
  }
})();
