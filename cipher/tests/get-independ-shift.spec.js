import { describe, test } from "@jest/globals";
import { getIndependShift } from "../get-independ-shift.js";

describe("Проверка работы правильности сфункции смещения", () => {
  test("{shiftType: 'c', action: '0'} ✔️", async () => {
    expect(getIndependShift({ shiftType: "c", action: "0" })).toStrictEqual(25);
  });
  /**
   * Так как смещение реализовано через шифт по модулю
   * значение шифта может бфть больше алфавита
   */
  test(`{shiftType: 'c', action: '1'} ✔️ 
  Так как смещение реализовано через шифт по модулю 
  значение шифта может быть больше алфавита`, async () => {
    expect(getIndependShift({ shiftType: "c", action: "1" })).toStrictEqual(27);
  });
  test(`{shiftType: 'a', action: '0'} ✔️ 
  Атбаш не иммет шифт так как у него другой алгоритм шифрования `, async () => {
    expect(getIndependShift({ shiftType: "a", action: "0" })).toStrictEqual(26);
  });
  test(`{shiftType: 'r', action: '0'} ✔️`, async () => {
    expect(getIndependShift({ shiftType: "r", action: "0" })).toStrictEqual(18);
  });
  test(`{shiftType: 'r', action: '1'} ✔️`, async () => {
    expect(getIndependShift({ shiftType: "r", action: "1" })).toStrictEqual(34);
  });
  test(`{} ❌`, async () => {
    expect(getIndependShift({})).toStrictEqual(NaN);
  });
});
