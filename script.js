var worker = new Worker("./Worker.js")
import Utils from "./Utils.js"
import Tuple from "./Tuple.js"
import Table from "./Table.js"
import Page from "./Page.js"
import Bucket from "./Bucket.js"
const createTableBtn = document.querySelector("#createTableBtn")
const mostraTabelas = document.querySelector("#mostraTabela")
const mostraTabelapagina = document.querySelector("#mostraTabelapaginas")

createTableBtn.addEventListener("click", createIndex)
mostraTabelas.addEventListener("click", mostraTabela)
mostraTabelapagina.addEventListener("click", mostraTabelapaginas)

var words = ""
var table
var pages
var buckets
var numb=[]
var tab=[]
var pgid=[]
var pagTid=[]
var pag=[]
// obter informacoes do usuario
// criar indice
function createIndex() {
  // criar tabela
  table = createTable()
  // criar paginas
  pages = createPages(1000, null, table)
  // criar buckets
  //buckets = createBuckets(pages, table)
}

worker.onmessage = function (e) {
  console.log(e.data)
}
loadWords().then((result) => (words = result))


async function loadWords() {
  let fileContent = ""
  console.log("carregando arquivo...")
  //fileContent = await fetch("test.txt")
  fileContent = await fetch("words.txt")
  fileContent = await fileContent.text()
  fileContent = fileContent.split("\n")
  document.querySelector("#createTableBtn").disabled = false

  console.log("arquivo carregado")
    
  return fileContent

}

function createTable() {
console.log("---------------createTable----------------")

  // criar chaves de busca
  let numbers = []
  let tuples = []
  for (let i = 0; i <= 466550; i++) {
    numbers[i] = i + 1
  }

  Utils.shuffleArray(numbers)

    

  // criar tuplas
  for (let j = 0; j < words.length; j++) {

    numb[j]=numbers[j]
    tab[j]=numbers[j]+" "+ words[j]
    tuples.push(new Tuple(numbers[j], words[j]))
  }

document.querySelector("#mostraTabela").disabled = false
document.querySelector("#mostraTabelapaginas").disabled = false
console.log
("------------------------------------------")
  // criar tabela
  return tuples
  
 // return new Table(tuples)

    
}


function mostraTabela(){
console.log("---------------mostraTabela----------------")

if(numb!=null){
//-----------------------------------------tabela id tupla ----------------------
var itemsDiv = document.querySelector("#tabelateste")
var wrapper = document.createElement("table")
var ind=0;
const preloadedItems = 1000
const height = 300



wrapper.innerHTML = ""

wrapper.innerHTML +="<th>"+"Tuple ID"+"</th>"+"<th>"+"Tuple ID"+"</th>"
for (ind; ind < preloadedItems; ind++) {

wrapper.innerHTML += "<tr>"+"<td>"+ numb[ind]+"</td>"+"<td>"+ words[ind]+"</td>"+"</tr>"

}
wrapper.style.height = height + "px"
wrapper.style.overflowY = "scroll"

wrapper.onscroll = function () {
  
  if ((wrapper.scrollHeight - wrapper.clientHeight) - wrapper.scrollTop < 200) {

   wrapper.innerHTML += "<tr>"+"<td>"+numb[ind++]+"</td>"+"<td>"+words[ind++]+"</td>"+"</tr>"



  }

}
itemsDiv.insertAdjacentElement("beforeend", wrapper)

}


document.getElementById("tabela").style.display =  "table";
console.log("------------------------------------------")

}


async function mostraTabelapaginas(){
console.log("---------------mostraTabelapaginas----------------")
//9 min
//40000 - 24 seg

let j=0
let i=0
  for (j; j < npgid.length; j++) {
  let table= document.getElementById("tabelaPaginas");
  let row =table.insertRow(j);
  let coluna1=row.insertCell(0);
  coluna1.innerHTML = pgid[j];
  let coluna2=row.insertCell(1);
  coluna2.innerHTML = pagTid[j];

  if(j>40000*i){
console.log(j)

i++;

 }
  }



console.log("------------------------------------------")

}



  


function createPages(numOfPages, pageLength, table) {
    console.log("---------------createPages----------------")
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

 // let tableCopy = table.tuples
let tableCopy = tab

  Utils.shuffleArray(tableCopy)

  var sliceBegin = 0
  var sliceEnd = pageLength

  for (let j = 0; j < numOfPages; j++) {
    var chunk = tableCopy.slice(sliceBegin, sliceEnd)
     pag[j]=pageIDs[j]+" "+ chunk
     pgid[j]=pageIDs[j]
     pagTid[j]=chunk
    pages.push(new Page(pageIDs[j], chunk))
    sliceBegin = sliceEnd
   
    sliceEnd += pageLength
  }

console.log("------------------------------------------")
  return pages
  
}

function createBuckets(pages, table) {
  console.log("---------------createBuckets----------------")
  var hashKeyMap = createHashMap(table)

  var buckets = []
  var bucketLength = hashKeyMap.length

  // num of buckets > num of tuples / max num of tuples per bucket (depends on hash)
  var numOfBuckets = table.tuples.length / bucketLength

  var tuples = [`${pages[0].address}`]
  for (let i = 0; i < pages.length; i++) {
    pages[i].tuples.map((tuple) => tuples.push(tuple))
    if (pages[i + 1] !== undefined) tuples.push(`${pages[i + 1].address}`)
  }

  for (let [hash, searchkeys] of hashKeyMap.entries()) {
    // for each hash, create a bucket

    // var filteredPage = pages.filter((page) =>
    //   page.tuples.some((tuple) => {
    //     searchkeys.includes(tuple.searchKey)
    //   })
    // )
    for (let i = 0, page = 1; i < tuples.length; i++) {
      
    }
  }
  debugger
 buckets.push(
    new Bucket(keyHashMap[i].hash, { wordId: keyHashMap[i].searchKey })
  )
console.log("------------------------------------------")
}

function createHashMap(table) {

   
  var keyHashObjArray = table.tuples
    .map((tuple) => tuple.searchKey)
    .map((searchKey) => {
      return { searchKey, hash: Utils.modHash(searchKey) }
    })

  var uniqueHashes = Array.from(new Set(keyHashObjArray.map((obj) => obj.hash)))
  var hashKeyMap = new Map()
  uniqueHashes.map((hash) => hashKeyMap.set(hash, []))
  uniqueHashes.forEach((hash) => {
    keyHashObjArray.forEach((obj) => {
      if (obj.hash === hash) {
        var keys = hashKeyMap.get(hash)
        keys.push(obj.searchKey)
        hashKeyMap.set(hash, keys)
      }
    })
  })

  return hashKeyMap
}
