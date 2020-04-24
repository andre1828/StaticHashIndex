export default {
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
  },
  toAscCode(word) {
    return word.split("").map(char => char.charCodeAt(0))
  },
  sdbmHash(key) {
    key = key + ""
    var hash = 5381 | 0
    key = key.split("").map(char => char.charCodeAt(0))
    for (let i = 0; i < key.length; i++) {
      hash = key[i] + (hash << 6) + (hash << 16) - hash
    }

    return hash >>> 0
  },
  modHash(key) {
    const m = 999959
    const ascCodeKey = (key + "")
      .split("")
      .map(char => char.charCodeAt(0))
      .reduce((prev, curr) => prev + curr)
    const hash = ascCodeKey % m
    return hash
  },
  divisionHash(key) {
    key = key | 0
    return Math.floor(key / 1000)
  },
  calculateNumOfCollisions(hashes) {
    // var collisions = new Map()
    // for (let i = 0, j = 1; i < hashes.length; ) {
    //   if (hashes[i] === hashes[j]) {
    //     collisions.set(i, (collisions.get(i) | 0) + 1)
    //   }
    //   if (j === hashes.length - 1) {
    //     i, (j = 0)
    //   } else {
    //     j++
    //   }
    // }
    return hashes.length - new Set(hashes).size
  },

  createCollisionMap(hashes) {
    var collisions = new Map()
    new Set(hashes).forEach(hash => !hash || collisions.set(hash, 0))

    for (let [hash, count] of collisions) {
      for (let i = 0; i < hashes.length; i++) {
        if (hashes[i] === hash) {
          collisions.set(hash, collisions.get(hash) + 1)
        }
      }
    }

    return collisions
  }
}
