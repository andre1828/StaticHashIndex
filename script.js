const worker = new Worker("worker.js")
import Tuple from "./Tuple.js"
import Table from "./Table.js"
import Page from "./Page.js"
const createTableBtn = document.querySelector("#createTableBtn")
createTableBtn.addEventListener("click", createInitialState)
var words = ""
var table
var pages

// obter informacoes do usuario
// criar estado inicial
function createInitialState() {
  var hashes = words.map(hash)
  // criar tabela
  table = createTable()
  // criar paginas
  pages = createPages(1000, null, table)
  // criar buckets
  // buckets = createBuckets(pages)
}

loadWords().then(result => (words = result))

function CriarTabelaWorker() {
  worker.postMessage(words)
}

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

worker.onmessage = function(e) {
  console.log(e)
}

function createTable() {
  // criar chaves de busca
  let numbers = []
  let tuples = []
  for (let i = 0; i <= 466550; i++) {
    numbers[i] = i + 1
  }

  shuffleArray(numbers)

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

  shuffleArray(pageIDs)

  let tableCopy = table.tuples

  shuffleArray(tableCopy)

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

function createBuckets(pages) {
  // num of buckets = num of tuples / max num of tuples per bucket (depends on hash)
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

function hash(key) {
  var charCodeArray = toAscCode(key)
  return charCodeArray.reduce(
    (prev, cur, curIndex) => (prev * cur * (curIndex + 1)) >> curIndex
  )
}

function toAscCode(word) {
  return word.split("").map(char => char.charCodeAt(0))
}

function calculateCollisionRate(hashes) {
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

  return new Set(hashes)
}
