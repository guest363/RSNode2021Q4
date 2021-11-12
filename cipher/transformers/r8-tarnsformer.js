import { transformer } from "../../io-reader/transformer";
import { getIndependShift } from "../get-independ-shift";
import { shifter } from "../shifter";

export const r8Transformer = (action) => (source) => {
  const independentShift = getIndependShift({
    shiftType: "r",
    action,
  });

  const cipher = shifter(independentShift);
  return transformer(cipher)(source);
};
