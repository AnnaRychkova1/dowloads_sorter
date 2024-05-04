// 1 Знайти папку;
// 2 Перебрати файли в папці;
// 3 Перенести файли у відповідні папки. Якщо відсутня папка - створити її;
// 4 Якщо буде папка - перебрати її вміст;

import { program } from "commander";
import path from "path";

program.option("-dn, --dirname <string>");

program.parse();

const options = program.opts();
console.log(options);
// const limit = options.first ? 1 : undefined;
// console.log(program.args[0].split(options.separator, limit));

function dirHander(dirpath) {
  const abspath = path.resolve(dirpath);
  console.log(abspath);
}

dirHander(options.dirname);
