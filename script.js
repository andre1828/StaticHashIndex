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








/*
var words = '';
var fileInput = document.querySelector("#arq");

async function CriaTabela() {
  words = await fileInput.files[0].text();
  words = words.split("\n");


//document.getElementById("criar").disabled = true;
var table= document.getElementById("tabela");

  var tablehash= document.getElementById("tabelahash");
//------------------------cria a tabela-----------------
var keys= new Array();
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

//------------------------mostra a tabela-----------------
for(var l=0;l<words.length;l++){
var row =table.insertRow(l);
var coluna1=row.insertCell(0);
coluna1.innerHTML =tab.key[l];
var coluna2=row.insertCell(1);
coluna2.innerHTML =tab.tupla[l];

}

//------------------------cria a pagina-----------------
//pagina:
//onde as tuplas da tabela estao distribuidas
var pag = new Object();
//tam=tamanho da pagina digitado
//pag.id=endereco da pagina
//pag.key=chave de busca
var tam =document.getElementById("tamanho").value;

//apagar depois
if(tam==0||tam==null){
  tam=10;
}
var id= new Array();
var pkey= new Array();
var ip=0;
for(var n=0;n<words.length;n++){
        if(n<tam){
        var end=Math.floor(Math.random() * words.length);
        id[n]=ip;
        pkey[n]=tab.tupla[end];
        console.log(pkey[n]);
}else{
  ip++;
}

}
pag.id=id;
pag.key=pkey;

//-------------comentar depois
//mostra pagina
for(var pg=0;pg<words.length;pg++){
var rowa =tabelahash.insertRow(pg);
var coluna1a=rowa.insertCell(0);
coluna1a.innerHTML = pag.id[pg];
var coluna2a=rowa.insertCell(1);
coluna2a.innerHTML = pag.keys[pg];
}


//=--------------------


//bucket:
//chave de busca e endereco da pag
//tamanho bucket fixo
//overflow: 
//tamanho do hash comparado com o tamanho do bucket se maior overflow





/*

for(var a=0;a<words.length;a++){
var row2 =tablehash.insertRow(a);
  if(hash(tab.key[a])==0){
var coluna32=row2.insertCell(0);
coluna32.innerHTML =tab.key[a];
var coluna22=row2.insertCell(1);
coluna22.innerHTML =tab.tupla[a];
var coluna24=row2.insertCell(2);
coluna24.innerHTML =hash(tab.key[a]);
}






}



function hash(k){
m= 3;
return k%m;
///h(k)=k mod m
//usar o conjunto set

}


*/