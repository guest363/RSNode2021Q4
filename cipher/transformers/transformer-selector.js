import { atbashTransformer } from "./atbash-transformer.js";
import { r8Transformer } from "./r8-tarnsformer.js";
import { caesarTransformer } from "./сaesar-transformer.js";

export const transformerSelector = {
  r: r8Transformer,
  c: caesarTransformer,
  a: atbashTransformer,
};
