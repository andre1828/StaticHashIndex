export default class Bucket {
  constructor(id, entries) {
    this.id = id
    this.entries = entries
  }

  get length() {
    return this.entries.length
  }
}
