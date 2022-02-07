
var detailURL = "";
$(document).ready(function () {
getList();

});

function getByRegion() {
  var pokeapiUrl = "https://pokeapi.co/api/v2/generation/1";

  $.getJSON(pokeapiUrl).done(function(data) {



  $.each(data.pokemon_species, function(index, pokemon) {
    var name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    var par = $("<p>").html("Pokemon species no." + (index+1) + " is" + name);
    par.appendTo("#pokemon");
    var url = pokemon.url;
  })
  });

}

function getList() {

  var allURL = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1118";

  $.getJSON(allURL).done(function(data) {

    let table = document.getElementById("pokemons");
    table.class = "table";
    while (table.hasChildNodes()) {
        table.removeChild(table.firstChild);
    }

      let thead = document.createElement('thead');

    thead.appendChild(document.createElement("th")).appendChild(document.createTextNode("Number"));
    thead.appendChild(document.createElement("th")).appendChild(document.createTextNode("Name"));
    thead.appendChild(document.createElement("th")).appendChild(document.createTextNode("Sprite"));
    table.appendChild(thead);

    $.each(data.results, function(index, pokemon) {
      var name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
      var url = pokemon.url;
      let row = table.insertRow(-1)
        //row.setAttribute("class", ".")
      let cell = row.insertCell(-1)
      cell.innerHTML = (index+1);

      cell = row.insertCell(-1)
      cell.innerHTML = name;
      cell.addEventListener('click', function() {
        document.location.href = "pokemon.html";
      });

      cell = row.insertCell(-1)
      var sprite = getSprite(pokemon.url, cell);
      window.localStorage.setItem("url", pokemon.url);
    })
  })
}

//Mit dieser Funktion wird das Icon des jeweiligen Pokemons zurückgegeben
function getSprite(pokURL, cell) {
  var url = pokURL;

  $.getJSON(url).done(function(data) {
    var spriteURL = data.sprites.front_default;
    cell.innerHTML = "<img src=\"" + spriteURL + "\"width=\"100px\" height=\"100px\">";
    cell.addEventListener('click', function() {
      sessionStorage.setItem("pokURL", url);
      console.log(sessionStorage.getItem("pokURL"));
      document.location.href = "pokemon.html"
    });
  })
}

function getDetailURL() {
  return detailURL;
}

function showDetails(url) {
  console.log(url);
  var nameTag = document.getElementById("name");
  $('#name').text("Test");
  //console.log(nameTag.innerHTML);
  //open(url);
}

function createTable(json) {

    let table = document.getElementById("pokemons");
    while (table.hasChildNodes()) {
        table.removeChild(table.firstChild);
    }
    let thead = document.createElement('thead');
    thead.appendChild(document.createElement("th")).appendChild(document.createTextNode("Number"));
    thead.appendChild(document.createElement("th")).appendChild(document.createTextNode("Image"));
    thead.appendChild(document.createElement("th")).appendChild(document.createTextNode("Name"));
    thead.appendChild(document.createElement("th")).appendChild(document.createTextNode("Types"));


    table.appendChild(thead);
    let counter = 0;
    $.each(json, function (pokemon, counter) {
        if (pokemon.name)  {

            counter++;
            let row = table.insertRow(-1)

            let cell = row.insertCell(-1)
            cell.innerHTML = counter;

            cell = row.insertCell(-1);
            cell.innerHTML = pokemon.name;
          }
    });

}
