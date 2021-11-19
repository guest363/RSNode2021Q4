import { describe, test } from "@jest/globals";
import { shifter } from "../shifter.js";

describe("Проверка работы шифратора в целом", () => {
  test("(1,c)(a) => b ✔️", async () => {
    expect(shifter(1, "c")("a")).toStrictEqual("b");
  });

  test("Сохранение регистра (1,c)(A) => B ✔️", async () => {
    expect(shifter(1, "c")("A")).toStrictEqual("B");
  });
  test("Только Английский алфавит (1,c)(123A) => 123B ✔️", async () => {
    expect(shifter(1, "c")("123A")).toStrictEqual("123B");
  });
  test("Алгоритм Атбаш, для него не используеется смещение (1,a)(aA) => zZ ✔️", async () => {
    expect(shifter(1, "a")("aA")).toStrictEqual("zZ");
  });
  test("Алгоритм ROT-8 (8,r)(a) => i ✔️", async () => {
    expect(shifter(8, "r")("a")).toStrictEqual("i");
  });
});
