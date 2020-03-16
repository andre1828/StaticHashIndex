onmessage = function(e) {
  let words = e.data
  var keys = new Array()
  var hashv = new Array()
  var tab = new Object()

  for (var j = 0; j < words.length; j++) {
    var p = Math.floor(Math.random() * words.length)

    if (!keys.includes(p)) {
      keys[j] = p
    } else {
      j--
    }
  }

  tab.key = keys
  tab.tupla = words

  this.postMessage(tab)
}
