import { transformerSelector } from "./cipher/transformers/transformer-selector.js";
import { cliParser } from "./cli/cli-parser.js";
import { ioReader } from "./io-reader/io-reader.js";

const cliParams = cliParser(process);
const commands = cliParams.command;
console.log(cliParams);

const readStream = ioReader({ param: cliParams.input, rwType: "read" });
const writeStream = ioReader({ param: cliParams.output, rwType: "write" });

/**
 * Инициализируем потом чтения.
 * Теперь к нему можно сколь угодно много
 * стакать потоков через метод .pipe()
 */
let currentPipe = readStream;
/**
 * Накидываем потоки шифрования
 */
for await (const command of commands) {
  const cipherType = command[0];
  const cipherAction = command[1];
  const cipherPipe = transformerSelector[cipherType](cipherAction);

  currentPipe = currentPipe.pipe(cipherPipe);
}
/**
 * В завершении пишем все это дело в writeStream
 */
currentPipe.pipe(writeStream);
