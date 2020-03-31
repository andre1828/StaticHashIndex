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
// criar estado inicial
function createIndex() {
  let numbers = []
  for (let i = 0; i <= 466550; i++) {
    numbers[i] = i + 1
  }
  var hashes = numbers.map(Utils.modHash)
  worker.postMessage(hashes)
  return
  // criar tabela
  table = createTable()
  // criar paginas
  pages = createPages(1000, null, table)
  // criar buckets
  buckets = createBuckets(pages, table)
}

worker.onmessage = function(e) {
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
  var pageLength = pages[0].length
  var hashes = table.tuples
    .map(tuple => tuple.searchKey)
    .map(searchKey => {
      return { searchKey, hash: Utils.sdbmHash(searchKey) }
    })
  var collisions = Utils.calculateNumOfCollisions(hashes.map(obj => obj.hash))
  var bucketLength
  if (collisions) {
    bucketLength = words.length / (words.length - collisions)
  } else {
    bucketLength = 1 // words.length / words.length
  }

  // num of buckets > num of tuples / max num of tuples per bucket (depends on hash)
  var numOfBuckets = words.length / bucketLength

  for (let i = 0; i < numOfBuckets; i++) {
    // for each hash, create a bucket
    
  }
}

function createHashMap(keys) {
  //TODO create map of Hash -> array of keys
}
