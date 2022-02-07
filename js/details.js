var url = sessionStorage.getItem("pokURL");
$(document).ready(function () {
  getData(url);
  var body = document.getElementById("body");
});

function getData(url) {
  console.log(url);
  $.getJSON(url).done(function(data) {

    var nameS = data.name;
    var typeS = "";
    var imgS = "<img src=\"" + (data.sprites.other["official-artwork"]["front_default"]) + "\"width=\"300px\" height=\"300px\">"
    var hpS = data.stats[0]["base_stat"];
    var attackS = data.stats[1]["base_stat"];
    var defenseS = data.stats[2]["base_stat"];
    var specAttackS = data.stats[3]["base_stat"];
    var specDefS = data.stats[4]["base_stat"];
    var speedS = data.stats[5]["base_stat"];
    var weightS = data.weight;

    $.each(data.types, function(index, type) {
      typeS += type.type.name + ", ";
    })
    typeS = typeS.substr(0, typeS.length - 2);

    function addRow(data){
      var bsCont = document.createElement("div");
      bsCont.setAttribute("class", "container")
      var bsRow = document.createElement("div")
      bsRow.setAttribute("class", "row ");
      var bsCol = document.createElement("div");
      bsCol.setAttribute("class", "col");
      bsRow.appendChild(bsCol);

      var bsCol5 = document.createElement("div");
      bsCol5.setAttribute("class", "col-5 d-flex justify-content-center bg-info display-6");
      bsRow.appendChild(bsCol5);
      bsCol5.innerHTML = data;

      bsCol = document.createElement("div");
      bsCol.setAttribute("class", "col");
      bsRow.appendChild(bsCol);

      bsCont.appendChild(bsRow);
      var dataList = document.getElementById("dataList")
      dataList.appendChild(bsCont);
    }

    addRow(nameS);
    addRow(imgS);
    addRow("Type: " + typeS);
    addRow("HP: " + hpS);
    addRow("Attack: " + attackS);
    addRow("Defense: " + defenseS);
    addRow("Special Attack: " + specAttackS);
    addRow("Special Defense: " + specDefS);
    addRow("Speed: " + speedS);
    addRow("Weight: " + weightS);


  });
}
