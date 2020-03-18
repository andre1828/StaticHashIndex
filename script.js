const worker = new Worker("worker.js")
import Tuple from "./Tuple.js"
import Table from "./Table.js"
const createTableBtn = document.querySelector("#createTableBtn")
createTableBtn.addEventListener("click", createInitialState)
var words = ""
var table

// obter informacoes do usuario
// criar estado inicial
function createInitialState() {
  // criar tabela
  table = createTable()
  // criar paginas
  // criar buckets
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

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}
