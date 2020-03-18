export default class Bucket {
  constructor(entries) {
    this.entries = entries
  }

  get length() {
    return this.entries.length
  }
}
