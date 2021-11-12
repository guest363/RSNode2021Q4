import { pipeline } from "stream";
import { transformerSelector } from "./cipher/transformers/transformer-selector.js";
import { cliParser } from "./cli/cli-parser.js";
import { ioReader } from "./io-reader/io-reader.js";

const cliParams = cliParser(process);
const commands = cliParams.command;

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
  const cipherTransformer = transformerSelector[cipherType](cipherAction);

  currentPipe = await pipeline(currentPipe, cipherTransformer, (err) => {
    if (err) {
      console.error(`Failed ${cliParams.action}`, err);
    } else {
      console.log(`File success ${cliParams.action}`);
    }
  });
}

/**
 * В завершении пишем все это дело в writeStream
 */
currentPipe.pipe(writeStream);
