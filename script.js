var words = '';
// var fileInput = document.querySelector("#arq");
words = carregarArquivo();

async function CriaTabela() {
  
  words = words.split("\n");

var tam =document.getElementById("tamanho").value;

//document.getElementById("criar").disabled = true;
var table= document.getElementById("tabela");

  var tablehash= document.getElementById("tabelahash");

var keys= new Array();
var hashv = new Array();
var tab = new Object();


for(var j=0;j<words.length;j++){
var p=Math.floor(Math.random() * words.length);

 if(!keys.includes(p)){
            keys[j]=p;
          }else{
        j--;
          }  }


tab.key= keys;
tab.tupla= words;

/*
for(var i=0;i<words.length;i++){
var row =table.insertRow(i);
var coluna1=row.insertCell(0);
coluna1.innerHTML = keys[i];
var coluna2=row.insertCell(1);
coluna2.innerHTML = words[i];
*/







for(var l=0;l<words.length;l++){
var row =table.insertRow(l);
var coluna1=row.insertCell(0);
coluna1.innerHTML =tab.key[l];
var coluna2=row.insertCell(1);
coluna2.innerHTML =tab.tupla[l];

}

for(var a=0;a<words.length;a++){
var row2 =tablehash.insertRow(a);
var coluna12=row2.insertCell(0);
coluna12.innerHTML =hash(tab.key[a]);
var coluna32=row2.insertCell(1);
coluna32.innerHTML =tab.key[a];
var coluna22=row2.insertCell(2);
coluna22.innerHTML =tab.tupla[a];


}




}



function hash(k){
m= 3;
return k%m;
///h(k)=k mod m
//usar o conjunto set

}

function carregarArquivo() {
  let conteudoDoArquivo = '';
  console.log("carregando arquivo...")
  fetch("words.txt")
    .then((response) => response.text())
    .then((texto) => {
       conteudoDoArquivo = texto;
       console.log("arquivo carregado");
    })

  return conteudoDoArquivo
}
