import Utils from "./Utils.js"
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
function createIndex() {
  // criar tabela
  table = createTable()
  // criar paginas
  pages = createPages(1000, null, table)
  // criar buckets
  buckets = createBuckets(pages)
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
  var hashes = table.tuples.map(tuple => tuple.searchKey).map(Utils.sdbmHash)
  // num of buckets = num of tuples / max num of tuples per bucket (depends on hash)
}

