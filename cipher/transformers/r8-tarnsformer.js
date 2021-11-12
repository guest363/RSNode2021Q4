import { transformer } from "../../io-reader/transformer.js";
import { getIndependShift } from "../get-independ-shift.js";
import { shifter } from "../shifter.js";

export const r8Transformer = (action) => (source) => {
  const independentShift = getIndependShift({
    shiftType: "r",
    action,
  });

  const cipher = shifter(independentShift);
  return transformer(cipher)(source);
};
