import { errorAction } from "../error-action.js";
import { parseArgv } from "./parse-argv.js";
import { parseCommands } from "./parse-commnads.js";

/**
 * Если задан параметр как в короткой нотации, -а, так и в
 * длинной, --action, длянная нотация приоритетнее.
 *
 * -c, --command: -`C` is for Caesar cipher (with shift 1), `A` is for Atbash cipher, `R` is for ROT-8 cipher
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
export const cliParser = (process) => {
  const [, , ...argv] = process.argv;
  if (!argv) {
    errorAction("Not specify required option -c");
  }
  /**
   * Какие параметры нам важны
   */
  const parseTemplate = { input: "-i", output: "-o", command: "-c" };
  const parsedArgvMap = parseArgv(argv, parseTemplate);
  const command = parsedArgvMap.get("-c");
  if (command === void 0) {
    errorAction("No cipher command");
  }
  const input = parsedArgvMap.get("-i");
  const output = parsedArgvMap.get("-o");
  const isSomeIOFile = typeof input === "string" || typeof output === "string";

  if (isSomeIOFile && input === output) {
    errorAction("The output and input file must not be the same");
  }

  const parcedCliOpt = {
    command: parseCommands(command.toLowerCase()),
    input: input || process.stdin,
    output: output || process.stdout,
  };
  return parcedCliOpt;
};
