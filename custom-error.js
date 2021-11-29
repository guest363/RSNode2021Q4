const errorCodes = {
  101: "Not specify arguments",
  102: `No cipher command "-c" specifyed`,
  103: "The output and input file must not be the same",
  201: "Arg parse error. ",
  301: "Invalid command options, set current cipher type. \n C - for Caesar, \n A - for Atbash, \n R - for ROT-8",
  302: "Atbash cipher has no second param",
  303: "No encode/decode param",
  401: "FS error. ",
};
export class customError extends Error {
  constructor(code, message) {
    super(message);
    this.name = "Custom error";
    this.code = code;
    this.fullMessage = errorCodes[code] + (message || "");
  }
}
