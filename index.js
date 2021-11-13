import { pipeline } from "stream";
import { addNewLineTransformer } from "./add-new-line-transformer.js";
import { transformerSelector } from "./cipher/transformers/transformer-selector.js";
import { cliParser } from "./cli/cli-parser.js";
import { customError } from "./custom-error.js";
import { ioReader } from "./io-reader/io-reader.js";

try {
  const cliParams = cliParser(process);
  const commands = cliParams.command;

  const readStream = ioReader({ param: cliParams.input, rwType: "read" });
  const writeStream = ioReader({ param: cliParams.output, rwType: "write" });

  /**
   * Колбек пайплайна выводит сообщение по
   * завершению выполнения команды. Либо успех, либо ошибка
   */
  const pipeCb = (action) => (err) => {
    if (err) {
      throw new customError(`Failed ${action}`, 100);
    } else {
      action ? console.log(`Success execute ${action}`) : "";
    }
  };
  /**
   * Инициализируем потом чтения.
   * Теперь к нему можно сколь угодно много
   * стакать потоков через метод .pipe()
   */
  let currentPipe = readStream;

  /**
   * Накидываем потоки шифрования
   */
  for (const command of commands) {
    const cipherType = command[0];
    const cipherAction = command[1];
    const cipherTransformer = transformerSelector[cipherType](cipherAction);
    currentPipe = pipeline(currentPipe, cipherTransformer, pipeCb());
  }

  /* Add \n */
  currentPipe = pipeline(
    currentPipe,
    addNewLineTransformer,
    pipeCb("ciphering")
  );
  /**
   * В завершении пишем все это дело в writeStream
   */
  currentPipe.pipe(writeStream);
} catch (error) {
  process.stderr.write(error.fullMessage);
  process.exit(1);
}
