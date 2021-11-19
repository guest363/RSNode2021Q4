import { CustomError } from "../custom-error.js";
import { parseArgv } from "./parse-argv.js";
import { parseCommands } from "./parse-commnads.js";
/**
 * Какие параметры нам важны
 */
export const parseTemplate = {
  input: ["-i", "--input"],
  output: ["-o", "--output"],
  config: ["-c", "--config"],
};
/**
 * Если задан параметр как в короткой нотации, -а, так и в
 * длинной, --action, длянная нотация приоритетнее.
 *
 * -c, --config: -`C` is for Caesar cipher (with shift 1), `A` is for Atbash cipher, `R` is for ROT-8 cipher
 *                -`1` is for encoding, `0` is for decoding
 * -i, --input: an input file
 * -o, --output: an output file
 *
 * Command not duplicated. `bash $ node my_ciphering_cli -c C1-C1-A-R0 -c C0`
 * If the input file is missed - use stdin as an input source.
 * If the output file is missed - use stdout as an output destination.
 * If the input and/or output file is given but doesn't exist or you can't read it
 * (e.g. because of permissions or it is a directory) - human-friendly error should be printed in stderr.
 *
 */

/**
 * @returns {Object} CLIReturn
 * @returns {String} CLIReturn.command - The Command like C0-A-R1
 * @returns {File || process.stdin} CLIReturn.input - The input file or stdin
 * @returns {File || process.stdout} CLIReturn.output - The output file or stdout
 */
export const cliParser = (process) => {
  const [, , ...argv] = process.argv;
  /**
   * argv всегда будет Array
   * смотрим его 0 эллемент
   */
  if (!argv[0]) {
    throw new CustomError(101);
  }

  const parsedArgvMap = parseArgv(argv, parseTemplate);

  const command = parsedArgvMap.get("config");

  const input = parsedArgvMap.get("input");
  const output = parsedArgvMap.get("output");

  if (command === void 0) {
    throw new CustomError(102);
  }
  const isSomeIOFile = typeof input === "string" || typeof output === "string";

  if (isSomeIOFile && input === output) {
    throw new CustomError(103);
  }

  const parcedCliOpt = {
    command: parseCommands(command.toLowerCase()),
    input: input || process.stdin,
    output: output || process.stdout,
  };

  return parcedCliOpt;
};
