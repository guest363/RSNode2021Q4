import { transformer } from "../../io-reader/transformer";
import { getIndependShift } from "../get-independ-shift";
import { shifter } from "../shifter";

export const caesarTransformer = (action) => (source) => {
  const independentShift = getIndependShift({
    shiftType: "c",
    action,
  });

  const cipher = shifter(independentShift);
  return transformer(cipher)(source);
};
