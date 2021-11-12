import { transformer } from "../../io-reader/transformer";
import { getIndependShift } from "../get-independ-shift";
import { shifter } from "../shifter";

export const atbashTransformer = () => (source) => {
  const independentShift = getIndependShift({
    shiftType: "a",
  });

  const cipher = shifter(independentShift);
  return transformer(cipher)(source);
};
