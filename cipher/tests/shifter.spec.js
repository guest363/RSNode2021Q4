import { describe, test } from "@jest/globals";
import { shifter } from "../shifter.js";

describe("Проверка работы шифратора в целом", () => {
  test("(1,c)(a) => b ✔️", () => {
    expect(shifter(1, "c")("a")).toStrictEqual("b");
  });

  test("Сохранение регистра (1,c)(A) => B ✔️", () => {
    expect(shifter(1, "c")("A")).toStrictEqual("B");
  });
  test("Только Английский алфавит (1,c)(123A) => 123B ✔️", () => {
    expect(shifter(1, "c")("123A")).toStrictEqual("123B");
  });
  test("Алгоритм Атбаш, для него не используеется смещение (1,a)(aA) => zZ ✔️", () => {
    expect(shifter(1, "a")("aA")).toStrictEqual("zZ");
  });
  test("Алгоритм ROT-8 (8,r)(a) => i ✔️", () => {
    expect(shifter(8, "r")("a")).toStrictEqual("i");
  });
});
