import { errorAction } from "../error-action.js";
const cipherTypes = ["c", "r", "a"];
/**
 * Тестирует последовательность команд на корректность
 * В случае ошибки завершает приложение
 */
export const testCommands = (command) => {
  const firstSymbol = command[0].toLowerCase();
  const secondSymbol = command[1];

  if (cipherTypes.indexOf(firstSymbol) === -1) {
    errorAction(
      "Invalid command options, set current cipher type. \n C - for Caesar, \n A - for Atbash, \n R - for ROT-8"
    );
  }
  if (firstSymbol === "a") {
    if (secondSymbol !== void 0) {
      errorAction("Atbash cipher has no second param");
    }
  } else if (secondSymbol !== "0" || secondSymbol !== "1") {
    errorAction("No encode/decode param");
  }
};
