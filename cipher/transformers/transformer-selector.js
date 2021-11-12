import { atbashTransformer } from "./atbash-transformer";
import { r8Transformer } from "./r8-tarnsformer";
import { caesarTransformer } from "./сaesar-transformer";

export const transformerSelector = {
  r: r8Transformer,
  c: caesarTransformer,
  a: atbashTransformer,
};
