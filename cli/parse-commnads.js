import { testCommands } from "./test-commands.js";

/**
 * Возвращает корректный набор команд для шифрования
 */
export const parseCommands = (commands) => {
  const splitedCommandsArray = commands.split("-");

  /** Протестировать на корректность заданной команды */
  splitedCommandsArray.forEach(testCommands);

  return splitedCommandsArray;
};
