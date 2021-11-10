import { cliParser } from "./cli/parser.js";

const cliParams = cliParser(process);
/* const independentShift = getIndependShift({
  shift: cliParams.shift,
  action: cliParams.action,
}); */

console.log(cliParams);
