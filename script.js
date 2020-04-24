var worker = new Worker("./Worker.js")
import Utils from "./Utils.js"
import Tuple from "./Tuple.js"
import Table from "./Table.js"
import Page from "./Page.js"
import Bucket from "./Bucket.js"
const createTableBtn = document.querySelector("#createTableBtn")
createTableBtn.addEventListener("click", createIndex)
var words = ""
var table
var pages
var buckets
// obter informacoes do usuario
// criar indice
function createIndex() {
  // criar tabela
  table = createTable()
  // criar paginas
  pages = createPages(1000, null, table)
  // criar buckets
  buckets = createBuckets(pages, table)
}

worker.onmessage = function (e) {
  console.log(e.data)
}

loadWords().then(result => (words = result))

async function loadWords() {
  let fileContent = ""
  console.log("carregando arquivo...")
  fileContent = await fetch("words.txt")
  fileContent = await fileContent.text()
  fileContent = fileContent.split("\r\n")
  document.querySelector("#createTableBtn").disabled = false
  console.log("arquivo carregado")
  return fileContent
}

function createTable() {
  // criar chaves de busca
  let numbers = []
  let tuples = []
  for (let i = 0; i <= 466550; i++) {
    numbers[i] = i + 1
  }

  Utils.shuffleArray(numbers)

  // criar tuplas
  for (let j = 0; j < numbers.length; j++) {
    tuples.push(new Tuple(numbers[j], words[j]))
  }

  // criar tabela
  return new Table(tuples)
}

function createPages(numOfPages, pageLength, table) {
  let pages = []
  let pageIDs = []

  if (numOfPages) {
    pageLength = Math.floor(words.length / numOfPages)
  } else {
    numOfPages = Math.floor(words.length / pageLength)
  }

  for (let i = 0; i < numOfPages; i++) {
    pageIDs.push(i + 1)
  }

  Utils.shuffleArray(pageIDs)

  let tableCopy = table.tuples

  Utils.shuffleArray(tableCopy)

  var sliceBegin = 0
  var sliceEnd = pageLength

  for (let j = 0; j < numOfPages; j++) {
    var chunk = tableCopy.slice(sliceBegin, sliceEnd)
    pages.push(new Page(pageIDs[j], chunk))
    sliceBegin = sliceEnd
    sliceEnd += pageLength
  }

  return pages
}

function createBuckets(pages, table) {
  var hashKeyMap = createHashMap(table)

  var buckets = []
  // var bucketLength = hashKeyMap.length

  // num of buckets > num of tuples / max num of tuples per bucket (depends on hash)
  // var numOfBuckets = table.tuples.length / bucketLength

  // create array with all tuples
  // var flatTuples = [`${pages[0].address}`]
  // for (let i = 0; i < pages.length; i++) {
  //   pages[i].tuples.map((tuple) => flatTuples.push(tuple))
  //   if (pages[i + 1] !== undefined) flatTuples.push(`${pages[i + 1].address}`)
  // }

  // create map with all tuples
  var flatTuplesMap = []
  for (let i = 0; i < pages.length; i++) {
    pages[i].tuples.forEach(tuple =>
      flatTuplesMap.push(pages[i].address, tuple)
    )
  }

  // create array with all searchKeys
  var flatSearchKeys = []
  for (let [hash, searchKeys] of hashKeyMap.entries()) {
    flatSearchKeys.push(hash + "", ...searchKeys)
  }

  for (let i = 0, hash = 0, page = null; i < flatSearchKeys.length; i++) {
    let bucketEntries = []

    if (typeof flatSearchKeys[i] === "string") {
      hash = flatSearchKeys[i] | 0
      i++
    }

    for (let j = 0; j < flatTuplesMap.length; j++) {
      if (flatSearchKeys[i] === flatTuplesMap[j].searchKey) {
        if (page === null) page = flatTuplesMap[j].page
        if(page !== flatTuplesMap[j].page) break
        bucketEntries.push({
          page: flatTuplesMap[j].page,
          searchKey: flatTuplesMap[j].searchKey,
        })
      }
    }

    // buckets.push(new Bucket(hash, bucketEntries))
  }
}

function createHashMap(table) {
  var keyHashObjArray = table.tuples
    .map(tuple => tuple.searchKey)
    .map(searchKey => {
      return { searchKey, hash: Utils.divisionHash(searchKey) }
    })

  var uniqueHashes = Array.from(new Set(keyHashObjArray.map(obj => obj.hash)))
  var hashKeyMap = new Map()
  uniqueHashes.map(hash => hashKeyMap.set(hash, []))
  uniqueHashes.forEach(hash => {
    keyHashObjArray.forEach(obj => {
      if (obj.hash === hash) {
        var keys = hashKeyMap.get(hash)
        keys.push(obj.searchKey)
        hashKeyMap.set(hash, keys)
      }
    })
  })

  return hashKeyMap
}
