function CriaTabela(){
var tam =document.getElementById("tamanho").value;
var arq =document.getElementById("arq");

document.getElementById("criar").disabled = true;
var table= document.getElementById("tabela");




console.log(res);
for(var i=0;i<tam;i++){
var row =table.insertRow(i);
var coluna1=row.insertCell(0);
coluna1.innerHTML = i;
var coluna2=row.insertCell(1);
coluna2.innerHTML = arq;
}

}