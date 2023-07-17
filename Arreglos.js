function saveData(data) {
  localStorage.setItem("nameData", data.join(';'));
}

function loadData() {
  var dataString = localStorage.getItem("nameData");
  return dataString ? dataString.split(';') : [];
}

document.getElementById("myForm").addEventListener("submit", function(event) {
  event.preventDefault();
  var name = document.getElementById("name").value;

  var dataArray = loadData();
  dataArray.push(name);
  saveData(dataArray);

  document.getElementById("result").innerHTML = "<div class='alert alert-success'>Material agregado correctamente.</div>";
  document.getElementById("myForm").reset();

  showNameList();
});

function showNameList() {
  var dataArray = loadData();
  var nameList = document.getElementById("nameList");
  nameList.innerHTML = "";
  dataArray.forEach(function(name, index) {
    var listItem = document.createElement("li");
    listItem.innerHTML = name + " <button class='btn btn-danger btn-sm' onclick='deleteName(" + index + ")'>X</button>";
    nameList.appendChild(listItem);
  });
}

function deleteName(index) {
  var dataArray = loadData();
  dataArray.splice(index, 1);
  saveData(dataArray);
  showNameList();
}

// Mostrar los nombres almacenados al cargar la página
showNameList();
