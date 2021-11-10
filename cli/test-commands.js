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
    errorAction("Invalid command options");
  }
  if (firstSymbol === "a" && secondSymbol !== void 0) {
    errorAction("Atbash cipher has no second param");
  } else if (
    firstSymbol !== "a" &&
    (secondSymbol !== "1" || secondSymbol !== "2")
  ) {
    errorAction("No encode/decode param");
  }
};
