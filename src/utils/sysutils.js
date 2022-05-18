export default class {
  static toTimeStamp(d) {
    if (d) {
      var datum = Date.parse(d);
      return datum / 1000;
    } else {
      return undefined;
    }
  }
}
