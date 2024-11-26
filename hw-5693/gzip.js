const { createGzip } = require("node:zlib");
const { pipeline } = require("node:stream");
const { createReadStream, createWriteStream } = require("node:fs");
const { promisify } = require("node:util");
const { getFileModificationTime } = require("./getFileModificationTime");
const { removeFile } = require("./remove-file");
const pipe = promisify(pipeline);

async function gzip(input, files) {
  const gzip = createGzip();
  const source = createReadStream(input);
  const extensionLength = -3;
  const isGzip = input.slice(extensionLength).includes(".gz");
  console.log("Обрабатываю файл " + input);

  if (isGzip) {
    const gzipModificationTime = await getFileModificationTime(input);
    const startOfStringIndex = 0;
    const originalName = input.slice(startOfStringIndex, extensionLength);
    const fileModificationTime = await getFileModificationTime(originalName);

    if (gzipModificationTime > fileModificationTime) {
      console.log("Архив актуальный, создавать не надо.");
      return;
    }

    if (fileModificationTime > gzipModificationTime) {
      console.log("Файл протух, пересоздаем архив");
      console.log("Удаляем старый архив");
      await removeFile(input);
      const destination = createWriteStream(`${originalName}.gz`);
      await pipe(source, gzip, destination);
      console.log("Создаем новый архив для файла " + input);
      return;
    }
  }

  if (!isGzip) {
    const isExists = files.includes(input + ".gz");
    if (isExists) {
      console.log("Архив для файла уже создан");
      return;
    }
  }

  const destination = createWriteStream(`${input}.gz`);
  console.log("Создаем архив для файла " + input);
  await pipe(source, gzip, destination);
}

module.exports = { gzip };
