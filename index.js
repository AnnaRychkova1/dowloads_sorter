import { program } from "commander";
import path from "path";
import fs from "fs/promises";
import fsSync from "fs";

program.option("-dn, --dirname <string>");
program.parse();
const options = program.opts();
const dirDict = {
  images: [".png", ".jpg", ".svg", ".gif", ".webp"],
  media: [".mp3", ".mp4", ".mkv", ".mov", ".avi"],
  documents: [".doc", ".docx", ".xlsx", ".pdf", ".pptx", ".txt"],
  archives: [".zip", ".vinrar", ".rar"],
  others: [],
};

async function dirHandler(dirpath) {
  const abspath = path.resolve(dirpath);
  const files = await fs.readdir(abspath);
  for (const file of files) {
    const fullPath = path.join(abspath, file);
    fsSync.stat(fullPath, (err, stats) => {
      if (stats.isDirectory()) {
        dirHandler(fullPath);
      } else {
        fileHandler(fullPath);
      }
    });
  }
}

function fileHandler(filePath) {
  const { ext, base } = path.parse(filePath);
  const dirName = Object.entries(dirDict).find((el) => {
    const [_, extArr] = el;
    return extArr.includes(ext);
  });
  //console.log(dirName[0]);
  const abspath = path.resolve(options.dirname);
  fsSync.readdir(abspath, (err, files) => {
    const isDirectExist = files.some((file) => file === dirName[0]);
    console.log(isDirectExist);
    const finishDir = path.join(abspath, dirName[0]);
    if (!isDirectExist) {
      fsSync.mkdir(finishDir, () => {
        fsSync.rename(filePath, path.join(finishDir, base), () => {});
      });
    } else {
      fsSync.rename(filePath, path.join(finishDir, base), () => {});
    }
  });
}
dirHandler(options.dirname);
