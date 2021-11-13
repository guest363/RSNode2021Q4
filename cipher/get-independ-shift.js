import { ENG_MODULE_ALPHABET, SHIFT_TYPES } from "./constants.js";

/**
 * Устанавливает правильное смещение в зависимости
 * от того нужно ли зашифровать или расшифровать файл
 * и типа переданного шифра
 */
export const getIndependShift = ({ shiftType, action = "0" }) => {
  const shift = SHIFT_TYPES[shiftType];
  const decodeShift = ENG_MODULE_ALPHABET - (shift % ENG_MODULE_ALPHABET);
  const encodeShift = ENG_MODULE_ALPHABET + (shift % ENG_MODULE_ALPHABET);
  return action === "0" ? decodeShift : encodeShift;
};
