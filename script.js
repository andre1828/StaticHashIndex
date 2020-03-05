var words = '';
var fileInput = document.querySelector("#arq");

async function CriaTabela() {
  words = await fileInput.files[0].text();
  words = words.split("\n");
  console.log(words);

var tam =document.getElementById("tamanho").value;

//document.getElementById("criar").disabled = true;
var table= document.getElementById("tabela");

for(var i=0;i<words.length;i++){
var row =table.insertRow(i);
var coluna1=row.insertCell(0);
coluna1.innerHTML = i;
var coluna2=row.insertCell(1);
coluna2.innerHTML = words[i];
}

}