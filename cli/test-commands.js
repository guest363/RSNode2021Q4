import { errorAction } from "../error-action.js";
import { isCurrectCipherType } from "./is-currect-cipher-type.js";
import { isCurrectCipherParam } from "./is-current-cipher-param.js";

/**
 * Тестирует последовательность команд на корректность
 * В случае ошибки завершает приложение
 */
export const testCommands = (command) => {
  const cipherSymbol = command[0].toLowerCase();
  const cipherParam = command[1];

  if (isCurrectCipherType(cipherSymbol)) {
    errorAction(
      "Invalid command options, set current cipher type. \n C - for Caesar, \n A - for Atbash, \n R - for ROT-8"
    );
  }
  if (cipherSymbol === "a") {
    if (cipherParam) {
      errorAction("Atbash cipher has no second param");
    }
  } else if (isCurrectCipherParam(cipherParam)) {
    errorAction("No encode/decode param");
  }
};
