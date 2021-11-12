import { transformer } from "../../io-reader/transformer.js";
import { getIndependShift } from "../get-independ-shift.js";
import { shifter } from "../shifter.js";

export const atbashTransformer = () => (source) => {
  const independentShift = getIndependShift({
    shiftType: "a",
  });

  const cipher = shifter(independentShift);
  return transformer(cipher)(source);
};
