const fs = require("fs/promises");

async function removeFile(input) {
  try {
    await fs.unlink(input);
    console.log(`Файл ${input} успешно удалён.`);
  } catch (err) {
    console.error(`Ошибка удаления файла ${input}: ${err.message}`);
    throw err;
  }
}

module.exports = { removeFile };
