onmessage = function(e) {
  let hashes = e.data

  var collisions = new Map()
  new Set(hashes).forEach(hash => !hash || collisions.set(hash, 0))

  for (let [hash, count] of collisions) {
    for (let i = 0; i < hashes.length; i++) {
      if (hashes[i] === hash) {
        collisions.set(hash, collisions.get(hash) + 1)
      }
    }
  }

  let greaterCount = 0
  let smallerCount = 1
  for (let [hash, count] of collisions) {
    if (count > greaterCount) {
      greaterCount = count
    }

    if (count < smallerCount) {
      smallerCount = count
    }
  }

  this.postMessage({collisions, greaterCount, smallerCount})
}
